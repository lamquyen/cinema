import React, { useEffect, useState } from 'react';
import './DetailMovie.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Moana from '../img/moanatrailer.png'; // Tạm thời sử dụng ảnh này
import PickingSeat from './PickSeat';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { selectedMovieId, time } = useParams(); // Nhận selectedMovieId và time từ URL
  const [showtimeData, setShowtimeData] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu suất chiếu dựa trên selectedMovieId và time
    const fetchShowtimeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/showtimes/by-movie-and-time?movieId=${selectedMovieId}&time=${time}`);
        const data = await response.json();
        setShowtimeData(data[0]); // Giả sử API trả về mảng với một phần tử
      } catch (error) {
        console.error('Error fetching showtime data:', error);
      }
    };

    if (selectedMovieId && time) {
      fetchShowtimeData();
    }
  }, [selectedMovieId, time]);

  if (!showtimeData) {
    return <div>Loading...</div>;  // Hoặc bạn có thể xử lý loading state ở đây
  }

  // Khi showtime đã có dữ liệu
  const { movie, room, times, seatsStandard, seatsVIP, cinema } = showtimeData;
  const { title, img01, type } = movie || {};
  const cinemaName = cinema ? cinema.cinemaName : 'Không có thông tin rạp';

  return (
    <>
      <Header />
      <div className="bg-gray-200 h-auto pt-[1px] z-0">
        <div className="stepper w-full mt-3 mb-5 bg-white h-fit py-4 items-center">
          <ul className="flex justify-center items-center">
            <li className="pr-4 pb-5 border-b-2 border-blue-800 text-base text-blue-400 font-nunito font-bold">
              Chọn phim/ Rạp/ Suất
            </li>
            <li className="pr-4 pb-5 border-b-2 border-blue-800 text-base text-blue-600 font-nunito font-bold">
              Chọn ghế
            </li>
            <li className="stepper">Chọn thức ăn</li>
            <li className="stepper">Thanh toán</li>
            <li className="stepper">Xác nhận</li>
          </ul>
        </div>
        <div className="mt-1 flex justify-around w-full">
          {/*picking */}
          <div className="h-fit w-[65%] bg-white rounded-lg py-8 px-10 mb-10">
            <PickingSeat />
          </div>

          {/*tag total */}
          <div className="h-fit w-[25%] font-nunito rounded-lg border-t-4 border-orange-600 float-right">
            <div className="bg-white w-full p-4">
              <div className="border-dashed border-b-[1px] border-black pb-4">
                <div className="flex flex-start w-fit">
                  <img className="w-32 h-44 object-cover mr-3" src={img01 || Moana} alt={title} />
                  <div>
                    <p className="font-bold text-lg">{title}</p>
                    <p className="mt-4 text-base">
                      {type} - <span className="bg-orange-600 text-white font-bold rounded-sm p-[3px]">{room}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="flex font-bold">
                    {cinemaName} - <p className="font-normal"> RẠP {room}</p>
                  </p>
                  <p>Suất: <span className="font-bold">{times}</span> - Chủ nhật, 8/12/2024</p>
                </div>
              </div>
              <div className="flex justify-between pt-4 font-bold">
                <p className="">Tổng Cộng</p>
                <p className="text-orange-600">0 đ</p>
              </div>
            </div>

            <div className="flex justify-around mt-7">
              <button className="bg-white font-bold rounded-lg w-32 py-1 text-orange-600 hover:bg-orange-600 hover:text-white">
                Quay lại
              </button>
              <button className="bg-white font-bold rounded-lg w-32 py-1 text-orange-600 hover:bg-orange-600 hover:text-white">
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Booking;

