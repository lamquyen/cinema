import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./DetailMovie.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Moana from "../img/moanatrailer.png";
import moment from "moment";
import "moment/locale/vi";
import MovieIsShowing from "./MovieIsShowing";
import { useNavigate } from "react-router-dom";

function DetailMovie() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [startIndex, setStartIndex] = useState(0);
  const daysToShow = 5;
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const { id } = useParams(); // Lấy id phim từ URL
  console.log(id);
  const [movieDetails, setMovieDetails] = useState(null);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies/${id}`
        ); // Gọi API lấy thông tin phim
        setMovieDetails(response.data); // Lưu thông tin phim vào state
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]); // Gọi lại khi id thay đổi

  const groupByCinema = (data, date) => {
    return data.reduce((acc, current) => {
      const currentShowDate = moment(current.days[0]).format("YYYY-MM-DD"); // Lấy ngày đầu tiên trong mảng 'days'
      if (currentShowDate === date) {
        const cinemaName = current.cinema.cinemaName;
        if (!acc[cinemaName]) {
          acc[cinemaName] = [];
        }
        acc[cinemaName].push(current);
      }
      return acc;
    }, {});
  };
  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/showtimes/movie/${id}`);
        const showtimesData = response.data || []; // Kiểm tra dữ liệu rỗng

        // Chuyển đổi trường 'days' trong dữ liệu về định dạng 'YYYY-MM-DD'
        const formattedShowtimesData = showtimesData.map(showtime => {
          const formattedDays = showtime.days.map(day => {
            const date = new Date(day);
            return date.toISOString().split('T')[0]; // Định dạng ngày theo 'YYYY-MM-DD'
          });

          return {
            ...showtime,
            days: formattedDays, // Cập nhật lại trường 'days' với định dạng mới
          };
        });

        console.log("Selected Date:", selectedDate);
        console.log("Formatted Showtimes Data:", formattedShowtimesData); // Kiểm tra dữ liệu đã định dạng
        const filteredShowtimes = groupByCinema(formattedShowtimesData, selectedDate); // Lọc theo ngày
        console.log("Filtered Showtimes:", filteredShowtimes); // Kiểm tra dữ liệu lọc
        setShowtimes(filteredShowtimes); // Cập nhật state
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };
    fetchShowtimes();
  }, [id, selectedDate]);

  if (!movieDetails) return <p>Loading...</p>;

  const handleChangePage = (id) => {
    navigate(`/Booking/${id}`); // thay thế '/trang-moi' bằng đường dẫn trang bạn muốn chuyển đến
  };

  /* function hiển thị lịch chiếu*/
  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, "days");
      days.push({
        day: capitalizeFirstLetter(date.format("dddd")),
        date: date.format("DD/MM"),
        fullDate: date.format("YYYY-MM-DD"),
      });
    }
    return days;
  };

  const weekDays = getWeekDays();
  const handleNext = () => {
    if (startIndex + 2 + daysToShow - 2 < weekDays.length) {
      setStartIndex(startIndex + 2);
    }
  };
  const handlePrev = () => {
    if (startIndex - 2 >= 0) {
      setStartIndex(startIndex - 2);
    }
  };

  /* fc mở model trailer*/
  const handelOpenModal = () => {
    setIsModalOpen(true);
  };
  const handelCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleBackdropClick = (e) => {
    // Đóng modal nếu nhấn ra bên ngoài nội dung modal
    if (e.target.id === "modal-backdrop") {
      handelCloseModal();
    }
  };
  const isShowtimePast = (showtime) => {
    const currentDate = moment();
    const showtimeDate = moment(showtime.days[0]).startOf('day'); // Lấy ngày chiếu
    const showtimeTime = moment(showtime.times, "HH:mm");

    // Kiểm tra nếu ngày chiếu đã qua hoặc nếu ngày chiếu là hôm nay và giờ chiếu đã qua
    return showtimeDate.isBefore(currentDate, 'day') || (showtimeDate.isSame(currentDate, 'day') && showtimeTime.isBefore(currentDate, 'minute'));
  };
  return (
    <div className="h-fit">
      <Header />
      <div>
        {/* trailer */}
        <div className="flex justify-center items-center bg-black w-full h-fit relative">
          <img
            className="w-[50%] h-[50%] object-cover"
            src={movieDetails.img02}
            alt=""
          />
          <a
            className="absolute self-center    z-10"
            onClick={(e) => {
              e.preventDefault();
              handelOpenModal();
            }}
            href={movieDetails.linkTrailer}
          >
            <svg
              className="w-fit h-36 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                className="w-[40%] "
                fill-rule="evenodd"
                d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                clip-rule="evenodd"
              />
            </svg>
          </a>

          <div className="absolute inset-0 bg-gradient-to-tl from-black to-transparent opacity-75"></div>
        </div>
        {isModalOpen && (
          <div
            id="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
          >
            <div className="rounded-lg shadow-lg w-3/5 relative">
              <div className="self-center">
                <iframe
                  width="100%"
                  height="600"
                  src={movieDetails.linkTrailer}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
        {/* detail Movie */}
        <div className=" ml-36 mb-14  font-nunito relative   ">
          <div className="flex flex-row gap-5 justify-start w-fit items-end -mt-11 ">
            <div className="w-[300px] h-[400px] overflow-hidden shadow-2xl">
              <img
                className=" border-white border-[3px] rounded-md z-10   w-[100%] h-[100%] object-cover  "
                src={movieDetails.img}
                alt=""
              />
            </div>
            <div className="  flex flex-col gap-3">
              <p className="text-3xl font-bold text-[rgb(51_51_51)] ">
                {movieDetails.title}
              </p>
              <p className=" flex gap-4 text-gray-700">
                <span className="flex">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="w-[80px] text-yellow-400"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {movieDetails.times} Phút
                </span>
                <span className="flex">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="w-[80px] text-yellow-400"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                    />
                  </svg>
                  {movieDetails.showDate.split('T')[0]}
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <span>
                  <svg
                    className="w-7 h-7 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="w-44 h-44 text-yellow-400"
                      d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                    />
                  </svg>
                </span>
                <span className="text-2xl">{movieDetails.rating}</span>
                <span className="self-end text-gray-500">(217vote)</span>
              </p>
              <p className="text-gray-500 text-sm ">
                Quốc gia: <span>{movieDetails.nation}</span>
              </p>
              <p className="text-gray-500 text-sm  ">
                Nhà sản xuất:{" "}
                <span className="hover:text-orange-500">
                  {movieDetails.manufacturer}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Thể loại:{" "}
                {movieDetails.genre.map((genre) => (
                  <span className="text-black border rounded-md m-1 p-1  hover:border-orange-500">
                    {genre}
                  </span>
                ))}

              </p>
              <p className="text-gray-500 text-sm">
                Đạo diễn:{" "}
                <span className="text-black border rounded-md m-2 p-1  hover:border-orange-500">
                  {movieDetails.director}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Diễn viên:{" "} {movieDetails.cast.map((cast) => (
                  <span className="text-black border rounded-md m-1 p-1  hover:border-orange-500">
                    {cast}
                  </span>))}

              </p>
            </div>
          </div>

          <div className="absolute right-3 top-14  ">
            {" "}
            <MovieIsShowing />
          </div>
        </div>

        {/* Nội dung phim */}
        <div className="ml-36 mr-[30%]  font-nunito  h-fit">
          <span className="mb-4 text-lg font-bold border-l-4 border-blue-700 pl-2 block">
            Nội dung phim
          </span>
          <p className="text-gray-500">{movieDetails.describe}</p>
        </div>
        {/* fillter lịch chiếu*/}
        <div className="ml-36 mr-[30%] mt-6 mb-10 font-nunito max-w-[60%] h-fit">
          <span className="mb-4 text-lg font-bold border-l-4 border-blue-700 pl-2 block">
            Lịch chiếu
          </span>
          <div className="flex items-center space-x-4 p-4 bg-white border-b-[2px]   border-b-blue-800 h-fit w-auto">
            {/* Nút điều hướng */}
            <div className="flex items-center space-x-4 min-w-fit">
              <button onClick={handlePrev} className=" py-2 rounded ">
                ❮
              </button>

              {/* Hiển thị các ngày */}
              <div className="flex overflow-hidden  ">
                {weekDays
                  .slice(startIndex, startIndex + daysToShow)
                  .map((day) => (
                    <div
                      key={day.fullDate}

                      onClick={() => {
                        console.log("Selected Date:", day.fullDate); // Kiểm tra giá trị
                        setSelectedDate(day.fullDate);
                      }}
                      className={`text-gray-700 text-base cursor-pointer text-center p-2 rounded transition-colors ${selectedDate === day.fullDate
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      <div className="">{day.day}</div>
                      <div className="">{day.date}</div>
                    </div>
                  ))}
              </div>

              {/* Nút điều hướng */}
              <button
                onClick={handleNext}
                disabled={startIndex + daysToShow >= weekDays.length}
                className="py-2 rounded "
              >
                ❯
              </button>
            </div>
            {/* Bộ lọc */}

            <div className="flex space-x-4">
              <select className="border rounded px-4 py-2">
                <option>Toàn quốc</option>
                <option>Hà Nội</option>
                <option>Đà Nẳng</option>
                <option>Hồ Chí Minh</option>
              </select>
              <select className="border rounded px-4 py-2">
                <option>Tất cả rạp</option>
                <option>rạp A</option>
                <option>rạp B</option>
                <option>rạp C</option>
              </select>
            </div>
          </div>
          {/* hiển thị suất chiếu */}
          <div className="w-[100%] py-3 flex-row">
            {Object.keys(showtimes).length === 0 ? (
              <p className="text-center text-gray-500">Không có suất chiếu nào vào ngày này.</p>
            ) : (
              Object.keys(showtimes).map((cinemaName) => (
                <div key={cinemaName} className="py-9 flex-row space-y-5 border-b-[1px]">
                  <p className="font-bold text-lg text-gray-800">{cinemaName}</p>
                  <div className="flex items-center gap-4 max-w-[100%]">
                    <p className="text-gray-700 font-medium w-fit mr-8 text-nowrap">
                      Suất Chiếu
                    </p>
                    <div>
                      {showtimes[cinemaName]
                        .sort((a, b) => {

                          const timeToMinutes = (time) => {
                            const [hours, minutes] = time.split(":").map(Number);
                            return hours * 60 + minutes;
                          };

                          return timeToMinutes(a.times) - timeToMinutes(b.times);
                        }).map((showtime) => {
                          const isPast = isShowtimePast(showtime); // Sử dụng hàm mới

                          return (
                            <button
                              key={showtime._id}
                              onClick={() => !isPast && handleChangePage(showtime._id)}
                              disabled={isPast}
                              className={`border mr-2 rounded-md px-4 py-1 ${isPast
                                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                : "border-gray-400 hover:bg-gray-300"
                                }`}
                            >
                              {showtime.times}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>



        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailMovie;