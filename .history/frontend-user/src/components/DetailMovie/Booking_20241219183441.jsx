import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailMovie.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Moana from '../img/moanatrailer.png';
import PickingSeat from './PickSeat';

const Booking = () => {
  const { selectedMovieId, time } = useParams(); // Nhận selectedMovieId và time từ URL
  const [showtimeData, setShowtimeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowtimeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/showtimes/by-movie-and-time?movieId=${selectedMovieId}&time=${time}`
        );
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
          setShowtimeData(data[0]); // Lấy đối tượng đầu tiên trong mảng
        } else {
          setError('Không tìm thấy suất chiếu phù hợp');
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setError('Lỗi khi lấy dữ liệu');
      }
    };

    if (selectedMovieId && time) {
      fetchShowtimeData();
    }
  }, [selectedMovieId, time]);

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi nếu có
  }

  if (!showtimeData) {
    return <div>Loading...</div>; // Hiển thị khi chưa nhận được dữ liệu
  }

  if (showtimeData) {
    const { movie, room, times, seatsStandard, seatsVIP, cinema } = showtimeData;
  
    // Truy cập thông tin movie
    const { title, img01, type } = movie || {};
    const cinemaName = cinema ? cinema.cinemaName : 'Không có thông tin rạp';
  
    // Render thông tin
    console.log('Title:', title);
    console.log('Image:', img01);
    console.log('Type:', type);
    console.log('Cinema:', cinemaName);
  }

  return (
    <>
      <Header />
      <div className="bg-gray-200 h-auto pt-[1px] z-0">
        <div className="stepper w-full mt-3 mb-5 bg-white h-fit py-4 items-center">
          <ul className="flex justify-center items-center ">
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
          {/* Picking seats */}
          <div className="h-fit w-[65%] bg-white rounded-lg py-8 px-10 mb-10">
            <PickingSeat />
          </div>

          {/* Tag total */}
          <div className="h-fit w-[25%] font-nunito rounded-lg border-t-4 border-orange-600 float-right">
            <div className="bg-white w-full p-4">
              <div className="border-dashed border-b-[1px] border-black pb-4">
                <div className="flex flex-start w-fit ">
                  <img className="w-32 h-44 object-cover mr-3" src={Moana} alt="" />
                  <div>
                    <p className="font-bold text-lg">{movie ? movie.title : 'Không rõ tên phim'}</p>
                    <p className="mt-4 text-base">
                      2D Phụ Đề -{' '}
                      <span className="bg-orange-600 text-white font-bold rounded-sm p-[3px]">T13</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="flex font-bold">
                    Galaxy Tân Bình - <p className="font-normal"> {room || 'Không có phòng'}</p>
                  </p>
                  <p>
                    Suất: <span className="font-bold">{times || 'Không có suất chiếu'}</span> - Chủ nhật, 8/12/2024
                  </p>
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

