import crypto from 'crypto';
import axios from 'axios';
import PaymentModel from '../Models/PaymentModels.js';
import dotenv from "dotenv";
import BookingModels from '../Models/BookingModels.js';
import { updateStatusSeat } from './MovieController.js';
import jwt from 'jsonwebtoken';
import PromotionModel from '../Models/PromotionModels.js';
dotenv.config();
var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

//tạo link thanh toán
const Payment = async (req, res) => {
    const { amount, userId, selectedSeats, showtimeId, selectedFoods, discountId } = req.body;
    var orderInfo = 'Thanh toán vé xem phim';
    var partnerCode = 'MOMO';
    const ticketCode = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    var redirectUrl = `http://localhost:3000/Profile?ticketCode=${ticketCode}`;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';
    const jwtToken = jwt.sign({
        orderId, amount, userId, selectedSeats, showtimeId: showtimeId, selectedFoods, ticketCode, discountId
    },
        process.env.JWT_SECRET, { expiresIn: '1h' });

    var ipnUrl = `https://7a05-2402-800-639f-abb9-50f5-2b7c-2252-fd29.ngrok-free.app/api/momo/callback?token=${jwtToken}`;
    var requestType = "payWithMethod";


    // var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    const rawSignature =
        `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)


    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)


    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });
    try {
        const response = await axios.post("https://test-payment.momo.vn/v2/gateway/api/create", requestBody, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(requestBody)

        // Trả về URL thanh toán cho client
        res.status(200).json({ payUrl: response.data.payUrl, token: jwtToken });
    } catch (error) {
        console.error(`Lỗi tạo thanh toán MoMo: ${error.message}`);
        res.status(500).json({ message: "Không thể tạo thanh toán." });
    }
};
const CallbackPayment = async (req, res) => {
    console.log(`dây là data`)
    console.log(req.body)
    const paymentData = new PaymentModel(req.body); // Tạo một đối tượng mới từ req.body
    await paymentData.save();
    try {
        // Nhận token từ query parameter
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ error: "Không có token trong yêu cầu" });
        }

        // Giải mã token để lấy thông tin thanh toán
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "Token không hợp lệ hoặc hết hạn" });
            }
            const { orderId, amount, userId, selectedSeats, selectedFoods, showtimeId, ticketCode, discountId } = decoded;


            const totalSeatPrice = selectedSeats.reduce(
                (sum, seat) => sum + (seat.typeSeat === 'vip' ? 150000 : 100000),
                0
            );

            const totalFoodPrice = selectedFoods.reduce(
                (sum, food) => sum + (food.price * food.quantity || 0),
                0
            );

            // Tên thức ăn
            const foodNames = selectedFoods.map(food => ({
                name: food.name || "Unknown",
                price: food.price || 0,
                quantity: food.quantity || 0
            }));
            // Lưu thông tin vào MongoDB
            const bookingData = new BookingModels({
                orderId,  // Thêm orderId vào dữ liệu cần lưu
                userId,
                showtimeId,
                seat: selectedSeats,
                foodNames,
                totalSeatPrice,
                totalFoodPrice,
                discountId,
                totalPrice: amount,
                ticketCode
            });
            console.log(bookingData)
            await bookingData.save();

            console.log("Đơn hàng đã được lưu thành công vào database!");
            await updateStatusSeat(showtimeId, selectedSeats.map(seat => ({ number: seat.number, status: 'booked' })));
            if (discountId) {
                const promotion = await PromotionModel.findById(discountId);
                if (promotion) {
                    // Cập nhật voucher là không còn hoạt động
                    promotion.isActive = false;
                    await promotion.save();
                    console.log("Voucher đã được cập nhật thành không hoạt động.");
                }
            }
            // Trả về phản hồi thành công một lần duy nhất
            return res.send('Thành công');

        });
    } catch (error) {
        console.error("Lỗi khi xử lý callback thanh toán:", error);
        res.status(500).send("Đã có lỗi xảy ra");
    } // Lư
};
//kiểm tra trạng thái đơn hàng
const CheckStatusOrder = async (req, res) => {
    const { orderId } = req.body;
    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    const requestBody = JSON.stringify({
        partnerCode: "MOMO",
        requestId: orderId,
        orderId,
        signature,
        lang: 'vi'

    })
    const option = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/query",
        headers: {
            'Content-Type': 'application/json'
        },
        data: requestBody
    }
    let result = await axios(option)
    return res.status(200).json(result.data)
}
const getVoucherByCode = async (req, res) => {
    const { code } = req.body; // Lấy code từ body request

    if (!code) {
        return res.status(400).json({ message: "Code is required" });
    }

    try {
        // Tìm kiếm voucher theo code
        const promotion = await PromotionModel.findOne({ code });

        if (!promotion) {
            return res.status(404).json({ message: "Voucher not found" });
        }

        // Kiểm tra nếu voucher không hoạt động hoặc đã hết hạn
        const currentDate = new Date();
        if (!promotion.isActive) {
            return res.status(400).json({ message: "Voucher đã được sử dụng" });
        }
        if (promotion.endDate < currentDate) {
            return res.status(400).json({ message: "Voucher đã hết hạn sữ dụng" });
        }
        // Trả về thông tin voucher
        return res.status(200).json({
            message: "Voucher hợp lệ",
            promotion
        });
    } catch (error) {
        console.error("Error fetching voucher:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};



export { Payment, CallbackPayment, CheckStatusOrder, getVoucherByCode };