import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuickBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState(""); // Lưu ID phim đã chọn
  const [selectedCinema, setSelectedCinema] = useState(""); // Lưu rạp đã chọn
  const [selectedDate, setSelectedDate] = useState(""); // Lưu ngày đã chọn
  const [selectedTime, setSelectedTime] = useState(""); // Lưu thời gian đã chọn
  const [showingMovies, setShowingMovies] = useState([]); // Danh sách phim
  const [cinemas, setCinemas] = useState([]); // Danh sách rạp
  const [availableDates, setAvailableDates] = useState([]); // Danh sách ngày chiếu cho phim
  const [availableTimes, setAvailableTimes] = useState({}); // Danh sách các suất chiếu cho ngày đã chọn
  const [showtimeId, setShowtimeId] = useState(""); // Lưu id của showtime đã chọn

  // Fetch movies từ API khi component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/movies/released"
        );
        setShowingMovies(response.data); // Lưu danh sách phim vào state
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Fetch showtimes (rạp, ngày chiếu, và suất chiếu) khi phim được chọn
  const fetchShowtimesByMovieId = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/showtimes/movie/${movieId}`
      );

      console.log("API response:", response.data); // Kiểm tra API trả về dữ liệu đúng

      // Lấy danh sách các rạp chiếu (cinema)
      const cinemaList = response.data.map((showtime) => showtime.cinema.cinemaName);
      setCinemas([...new Set(cinemaList)]); // Loại bỏ các rạp trùng lặp

      // Lấy tất cả các ngày chiếu (days) từ showtimes
      const daysList = response.data.reduce((acc, showtime) => {
        if (showtime.days && Array.isArray(showtime.days)) {
          showtime.days.forEach((day) => {
            const formattedDate = new Date(day).toLocaleDateString("vi-VN");
            if (!acc.includes(formattedDate)) acc.push(formattedDate);
          });
        }
        return acc;
      }, []);
      console.log("Available Dates:", daysList); // Kiểm tra danh sách ngày chiếu
      setAvailableDates(daysList); // Lưu danh sách ngày vào state

      // Lấy tất cả các suất chiếu (times) cho từng ngày
      const timesList = response.data.reduce((acc, showtime) => {
        if (showtime.days && Array.isArray(showtime.days)) {
          showtime.days.forEach((day) => {
            const formattedDate = new Date(day).toLocaleDateString("vi-VN");
            if (!acc[formattedDate]) {
              acc[formattedDate] = [];
            }

            // Kiểm tra nếu showtime.times là mảng, nếu không thì chuyển thành mảng
            if (Array.isArray(showtime.times)) {
              acc[formattedDate].push(...showtime.times);
            } else if (showtime.times) {
              acc[formattedDate].push(showtime.times); // Đảm bảo times được đưa vào dưới dạng mảng
            }
          });
        }
        return acc;
      }, {});
      console.log("Available Times:", timesList); // Kiểm tra danh sách suất chiếu
      setAvailableTimes(timesList); // Lưu danh sách times vào state, mỗi ngày có danh sách times riêng
    } catch (error) {
      console.error("Error fetching cinemas or showtimes:", error);
      setCinemas([]); // Nếu lỗi, đặt lại danh sách rạp
      setAvailableDates([]); // Đặt lại danh sách ngày
      setAvailableTimes({}); // Đặt lại danh sách times
    }
  };

  // Xử lý khi chọn phim
  const handleMovieChange = (movieId) => {
    setSelectedMovie(movieId);
    setSelectedCinema(""); // Reset selectedCinema khi chọn phim mới
    setSelectedDate(""); // Reset selectedDate khi chọn phim mới
    setSelectedTime(""); // Reset selectedTime khi chọn phim mới
    setShowtimeId(""); // Reset showtimeId khi chọn phim mới
    fetchShowtimesByMovieId(movieId); // Gọi API lấy danh sách rạp và ngày chiếu
  };

  // Xử lý khi chọn ngày
  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Lọc các showtimes cho ngày được chọn và cho rạp đã chọn
    const filteredShowtimes = showingMovies
      .flatMap((movie) => movie.showtimes || []) // Lấy tất cả các showtimes
      .filter((showtime) =>
        showtime.days &&
        showtime.days.some((day) => new Date(day).toLocaleDateString("vi-VN") === date) &&
        showtime.cinema.cinemaName === selectedCinema // Kiểm tra rạp đã chọn
      );

    // Lọc các suất chiếu từ showtimes cho ngày và rạp đã chọn
    const filteredTimes = filteredShowtimes.flatMap((showtime) => showtime.times).filter(Boolean);

    console.log("Filtered Times:", filteredTimes); // Kiểm tra filtered times
    setAvailableTimes({ [date]: filteredTimes });

    // Nếu có showtimes, lưu id của showtime vào state
    if (filteredShowtimes.length > 0) {
      setShowtimeId(filteredShowtimes[0]._id); // Lưu vào state 'showtimeId'
    }
  };

  // Xử lý khi chọn suất chiếu
  const handleTimeChange = (time) => {
    setSelectedTime(time);

    // Cập nhật lại showtimeId khi chọn thời gian
    const selectedShowtime = showingMovies
      .flatMap((movie) => movie.showtimes || [])
      .find(
        (showtime) =>
          showtime.cinema.cinemaName === selectedCinema &&
          showtime.days.some(
            (day) => new Date(day).toLocaleDateString("vi-VN") === selectedDate
          ) &&
          showtime.times.includes(time)
      );

    if (selectedShowtime) {
      setShowtimeId(selectedShowtime._id); // Cập nhật showtimeId
    }
  };

  return (
    <div className="quick-booking-container">
      {/* Dropdown chọn phim */}
      <div>
        <select
          value={selectedMovie}
          onChange={(e) => handleMovieChange(e.target.value)}
        >
          <option value="" disabled>
            Chọn Phim
          </option>
          {showingMovies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown chọn rạp */}
      <div>
        <select
          value={selectedCinema}
          onChange={(e) => setSelectedCinema(e.target.value)}
          disabled={!selectedMovie}
        >
          <option value="" disabled>
            Chọn Rạp
          </option>
          {cinemas.map((cinema, index) => (
            <option key={index} value={cinema}>
              {cinema}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown chọn ngày */}
      <div>
        <select
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          disabled={!selectedCinema}
        >
          <option value="" disabled>
            Chọn Ngày
          </option>
          {availableDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown chọn suất */}
      <div>
        <select
          value={selectedTime}
          onChange={(e) => handleTimeChange(e.target.value)}
          disabled={!selectedDate}
        >
          <option value="" disabled>
            Chọn Suất
          </option>
          {availableTimes[selectedDate]?.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Nút mua vé */}
      <Link
        className="btn"
        to={`/Booking/${showtimeId}`} // Truyền showtimeId vào URL
        disabled={!selectedMovie || !selectedCinema || !selectedDate || !selectedTime || !showtimeId} // Kiểm tra showtimeId có hợp lệ không
      >
        Mua vé nhanh
      </Link>
    </div>
  );
};

export default QuickBooking;