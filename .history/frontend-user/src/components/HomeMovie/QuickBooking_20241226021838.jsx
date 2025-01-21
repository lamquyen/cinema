import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Đảm bảo bạn đã import Link

const QuickBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showingMovies, setShowingMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [showtimeId, setShowtimeId] = useState(null); // State lưu showtimeId

  // Fetch movies khi component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies/released");
        setShowingMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Fetch showtimes, cinemas và dates khi phim được chọn
  const fetchShowtimesByMovieId = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/showtimes/movie/${movieId}`);
      const cinemaList = response.data.map((showtime) => showtime.cinema.cinemaName);
      setCinemas([...new Set(cinemaList)]);

      const daysList = response.data.reduce((acc, showtime) => {
        if (showtime.days && Array.isArray(showtime.days)) {
          showtime.days.forEach((day) => {
            const formattedDate = new Date(day).toLocaleDateString("vi-VN");
            if (!acc.includes(formattedDate)) acc.push(formattedDate);
          });
        }
        return acc;
      }, []);
      setAvailableDates(daysList);

      // Lấy showtimeId cho mỗi showtime
      const timesList = response.data.reduce((acc, showtime) => {
        if (showtime.days && Array.isArray(showtime.days)) {
          showtime.days.forEach((day) => {
            const formattedDate = new Date(day).toLocaleDateString("vi-VN");
            if (!acc[formattedDate]) {
              acc[formattedDate] = [];
            }
            // Kiểm tra nếu times là mảng hoặc chuỗi
            const times = Array.isArray(showtime.times) ? showtime.times : [showtime.times];
            times.forEach((time) => {
              acc[formattedDate].push({
                time,
                showtimeId: showtime._id, // Lưu showtimeId
              });
            });
          });
        }
        return acc;
      }, {});

      setAvailableTimes(timesList);
    } catch (error) {
      console.error("Error fetching cinemas or showtimes:", error);
      setCinemas([]);
      setAvailableDates([]);
      setAvailableTimes({});
    }
  };

  // Xử lý khi chọn phim
  const handleMovieChange = (movieId) => {
    setSelectedMovie(movieId);
    setSelectedCinema("");
    setSelectedDate("");
    setSelectedTime("");
    setShowtimeId(null); // Reset showtimeId
    fetchShowtimesByMovieId(movieId);
  };

  // Xử lý khi chọn suất chiếu
  const handleTimeChange = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    // Lấy showtimeId cho suất chiếu đã chọn
    const showtime = availableTimes[date]?.find((t) => t.time === time);
    if (showtime) {
      setShowtimeId(showtime.showtimeId);
      console.log("Selected Showtime ID:", showtime.showtimeId); // Kiểm tra showtimeId
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
          <option value="" disabled>Chọn Phim</option>
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
          <option value="" disabled>Chọn Rạp</option>
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
          <option value="" disabled>Chọn Ngày</option>
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
          onChange={(e) => handleTimeChange(selectedDate, e.target.value)}
          disabled={!selectedDate}
        >
          <option value="" disabled>Chọn Suất</option>
          {availableTimes[selectedDate]?.map((timeObj, index) => (
            <option key={index} value={timeObj.time}>
              {timeObj.time}
            </option>
          ))}
        </select>
      </div>

      {/* Nút mua vé */}
      <Link
        className="btn"
        to={`/Booking/${showtimeId}`}
        disabled={!showtimeId}
      >
        Mua vé nhanh
      </Link>
    </div>
  );
};

export default QuickBooking;