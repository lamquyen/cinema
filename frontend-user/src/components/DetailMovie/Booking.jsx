import React, { useState } from 'react';
import './DetailMovie.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Moana from '../img/moanatrailer.png';
import PickingSeat from './PickSeat';


const Booking = () => {
    const [selectedSeats, setSelectedSeats] = useState([]); // State lưu ghế đã chọn

    const handleSeatSelect = (seat) => {
        setSelectedSeats((prevSeats) => {
            // Kiểm tra ghế đã được chọn chưa
            const isAlreadySelected = prevSeats.some((s) => s.number === seat.number);

            if (isAlreadySelected) {
                // Nếu đã chọn, loại bỏ ghế
                return prevSeats.filter((s) => s.number !== seat.number);
            } else {
                // Nếu chưa chọn, thêm ghế vào danh sách
                return [...prevSeats, seat];
            }
        });
    };




    return (
        <>
            <Header />
            <div className="bg-gray-200 h-auto pt-[1px]  z-0 ">
                <div className="stepper w-full mt-3 mb-5  bg-white h-fit py-4 items-center">
                    <ul className="flex justify-center items-center ">
                        <li className=
                            "pr-4 pb-5 border-b-2 border-blue-800 text-base text-blue-400 font-nunito font-bold"
                        >Chọn phim/ Rạp/ Suất</li>
                        <li className="pr-4 pb-5 border-b-2 border-blue-800 text-base text-blue-600 font-nunito font-bold">Chọn ghế</li>
                        <li className="stepper">Chọn thức ăn</li>
                        <li className="stepper">Thanh toán</li>
                        <li className="stepper">Xác nhận</li>
                    </ul>
                </div>
                <div className="mt-1 flex justify-around w-full ">

                    {/*picking */}
                    <div className="h-fit w-[65%] bg-white rounded-lg py-8 px-10 mb-10">

                        <PickingSeat onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />





                    </div>
                    {/*tag total */}
                    <div className="h-fit w-[25%] font-nunito rounded-lg border-t-4 border-orange-600 float-right ">
                        <div className="bg-white w-full p-4">
                            <div className="border-dashed border-b-[1px] border-black pb-4 " >
                                <div className="flex flex-start w-fit ">
                                    <img className="w-32 h-44 object-cover mr-3" src={Moana} alt="" />
                                    <div >
                                        <p className="font-bold text-lg">Moana 2</p>
                                        <p className="mt-4 text-base">2D Phụ Đề - <span className="bg-orange-600 text-white font-bold rounded-sm p-[3px]">T13</span></p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="flex font-bold">Galaxy Tân Bình - <p className="font-normal"> RẠP 1</p> </p>
                                    <p>Suất: <span className="font-bold">18:15</span> - Chủ nhật, 8/12/2024</p>
                                </div>
                                {selectedSeats.map((seat, index) => (<div className=' flex justify-between font-medium text-base text-gray-500'>
                                    <p>{seat.number}</p>
                                    <p>{seat.typeSeat === 'vip' ? '150,000 đ' : '100,000 đ'}</p>

                                </div>))}



                            </div>
                            <div className="flex justify-between pt-4 font-bold">
                                <p className="">Tổng Cộng</p>
                                <p className="text-orange-600">
                                    {selectedSeats
                                        .reduce((sum, seat) => sum + (seat.typeSeat === 'vip' ? 150000 : 100000), 0)
                                        .toLocaleString()}{' '}
                                    đ
                                </p>                            </div>



                        </div>

                        <div className="flex justify-around mt-7">
                            <button className="
                             bg-white font-bold rounded-lg w-32 py-1 text-orange-600 hover:bg-orange-600 hover:text-white "
                            >Quay lại</button>
                            <button className=" 
                             bg-white font-bold  rounded-lg w-32 py-1 text-orange-600 hover:bg-orange-600 hover:text-white "
                            >Tiếp tục</button>
                        </div>
                    </div>




                </div>




            </div>

            <Footer />

        </>
    )
}
export default Booking;