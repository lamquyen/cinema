import Moana from '../img/moanatrailer.png'
import { QRCodeCanvas } from 'qrcode.react';
const Ticket = ({ booking }) => {
    if (!booking) return null;

    const {
        showtime: { movieTitle, time, day, cinema, room, img, type } = {},
        seats,
        foodNames,
        totalPrice,
        ticketCode,
        voucher,
        voucherCode
    } = booking;

    return (
        <div>
            <div className="bg-white w-full p-2">
                <div className="border-dashed border-b-[1px] border-black pb-2">
                    <div className="flex flex-start w-fit">
                        <img className="w-32 h-44 object-cover mr-3" src={img || Moana} alt={movieTitle} />
                        <div>
                            <p className="font-bold text-lg">{movieTitle}</p>
                            <p className="flex mt-4 gap-2 text-base">
                                2D phụ đề - <p className="w-fit bg-orange-600 text-white rounded-sm p-[1px]">{type}</p>
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="flex font-bold">
                            {cinema} - <span className="font-normal">{room}</span>
                        </p>
                        <p className='font-bold text-black'>Suất: <span className="text-gray-500">{time}</span> -
                            <span className="text-gray-500">{' '}{day}</span></p>
                    </div>
                    <div className='total flex justify-between font-medium text-base text-gray-500'>
                        <p className='flex gap-2'><p className='font-bold text-black'>Ghế: </p>{seats}</p>


                    </div>
                    <div className="total flex-col justify-between items-center font-medium text-base text-gray-500 ">
                        <p className='font-bold text-black'>Thức ăn :</p>
                        <p className="">{foodNames}</p>

                    </div>
                    <div className="total  items-center font-medium text-base text-gray-500 text-nowrap ">
                        <div className='flex gap-2'>
                            <p className='font-bold text-black'>Voucher:</p>
                            <p className="">{voucher}</p>
                        </div>
                        <div className='flex gap-2'>
                            <p className='font-bold text-black'>Mã Voucher :</p>
                            <p className="">{voucherCode}</p>
                        </div>


                    </div>


                </div>
                <div className="flex justify-between pt-4 font-bold">
                    <p className="">Tổng Cộng</p>
                    <p className="text-orange-600">
                        {totalPrice.toLocaleString()}{' '}VNĐ
                    </p>
                </div>
                <div className="mt-4 flex gap-10 ">
                    <p className="font-bold">Mã vé:</p>
                    <QRCodeCanvas value={ticketCode || 'N/A'} className="w-[100%]" />
                </div>
            </div>
        </div>
    )
}
export default Ticket;