import React, { useState, useEffect } from "react";
import axios from "axios";

const QuickBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showingMovies, setShowingMovies] = useState([]); // Danh sách phim
  const [cinemas, setCinemas] = useState([]); // Danh sách rạp
  const [availableDates, setAvailableDates] = useState([]); // Danh sách ngày chiếu cho phim
  const [availableTimes, setAvailableTimes] = useState([]); // Danh sách các suất cho ngày đã chọn

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

  // Fetch cinemas và days khi chọn phim
  const fetchShowtimesByMovieId = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/showtimes/movie/${movieId}`
      );
      console.log("Showtimes Data:", response.data); // Log dữ liệu

      const cinemaList = response.data.map((showtime) => showtime.cinema.cinemaName);
      setCinemas([...new Set(cinemaList)]); // Loại bỏ các rạp trùng lặp

      // Lấy tất cả các ngày chiếu từ showtimes
      const daysList = response.data.reduce((acc, showtime) => {
        if (showtime.days && Array.isArray(showtime.days)) {
          showtime.days.forEach((day) => {
            const formattedDate = new Date(day).toLocaleDateString("vi-VN");
            if (!acc.includes(formattedDate)) acc.push(formattedDate);
          });
        }
        return acc;
      }, []);
      console.log("Available Days:", daysList); // Log ngày chiếu
      setAvailableDates(daysList); // Lưu danh sách ngày vào state
    } catch (error) {
      console.error("Error fetching cinemas or showtimes:", error);
      setCinemas([]); // Nếu lỗi, đặt lại danh sách rạp
      setAvailableDates([]); // Đặt lại danh sách ngày
    }
  };

  // Xử lý khi chọn phim
  const handleMovieChange = (movieId) => {
    setSelectedMovie(movieId);
    setSelectedCinema(""); // Reset selectedCinema khi chọn phim mới
    setSelectedDate(""); // Reset selectedDate khi chọn phim mới
    setSelectedTime(""); // Reset selectedTime khi chọn phim mới
    fetchShowtimesByMovieId(movieId); // Gọi API lấy danh sách rạp và ngày chiếu
  };

  // Xử lý khi chọn ngày
  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Lấy ngày chuẩn
  
    console.log("Selected Date:", formattedDate); // Log ngày đã chọn
  
    const filteredTimes = showingMovies
      .filter((movie) => movie._id === selectedMovie) // Lọc phim đã chọn
      .flatMap((movie) => movie.showtimes || []) // Lấy showtimes của phim
      .filter((showtime) => {
        console.log("Showtime Days:", showtime.days); // Log ngày trong showtimes
        return showtime.days && showtime.days.some((day) => {
          const dayFormatted = new Date(day).toISOString().split('T')[0];
          console.log("Day Formatted:", dayFormatted); // Log ngày so sánh
          return dayFormatted === formattedDate; // So sánh ngày
        });
      })
      .map((showtime) => showtime.times); // Lấy tất cả times
  
    console.log("Filtered Times:", filteredTimes); // Log filtered times
  
    setAvailableTimes([...new Set(filteredTimes)]);
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
          onChange={(e) => setSelectedTime(e.target.value)}
          disabled={!selectedDate}
        >
          <option value="" disabled>
            Chọn Suất
          </option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Nút mua vé */}
      <button
        disabled={!selectedMovie || !selectedCinema || !selectedDate || !selectedTime}
      >
        Mua vé nhanh
      </button>
    </div>
  );
};

export default QuickBooking;