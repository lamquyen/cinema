import React, { useState, useEffect } from "react";
import axios from "axios";

const QuickBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showingMovies, setShowingMovies] = useState([]); // Danh sách phim
  const [cinemas, setCinemas] = useState([]); // Danh sách rạp
  const [showtimes, setShowtimes] = useState({}); // Showtimes theo từng rạp

  const dates = ["2023-12-01", "2023-12-02", "2023-12-03"];
  const times = ["10:00", "13:00", "16:00"];

  // Fetch movies từ API khi component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies/released");
        setShowingMovies(response.data); // Lưu danh sách phim vào state
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // Fetch cinemas và showtimes khi chọn phim
  const fetchShowtimesByMovieId = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/showtimes/movie/${movieId}`);
      const showtimesData = {};
      
      response.data.forEach((showtime) => {
        const cinemaName = showtime.cinema.cinemaName;
        if (!showtimesData[cinemaName]) {
          showtimesData[cinemaName] = [];
        }
        showtimesData[cinemaName].push(showtime);
      });

      setShowtimes(showtimesData); // Cập nhật showtimes theo các rạp
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      setShowtimes({}); // Nếu lỗi, đặt lại showtimes
    }
  };

  // Xử lý khi chọn phim
  const handleMovieChange = (movieId) => {
    setSelectedMovie(movieId);
    setSelectedCinema(""); // Reset selectedCinema khi chọn phim mới
    fetchShowtimesByMovieId(movieId); // Gọi API lấy showtimes
  };

  return (
    <div className="quick-booking-container">
      {/* Dropdown chọn phim */}
      <div>
        <select value={selectedMovie} onChange={(e) => handleMovieChange(e.target.value)}>
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
          {Object.keys(showtimes).map((cinemaName) => (
            <option key={cinemaName} value={cinemaName}>
              {cinemaName}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown chọn ngày */}
      <div>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={!selectedCinema}
        >
          <option value="" disabled>
            Chọn Ngày
          </option>
          {dates.map((date, index) => (
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
          {showtimes[selectedCinema] ? (
            showtimes[selectedCinema]
              .filter((showtime) => {
                const dayFormatted = new Date(selectedDate).toISOString().split('T')[0];
                return showtime.days.some((day) => new Date(day).toISOString().split('T')[0] === dayFormatted);
              })
              .flatMap((showtime) => showtime.times)
              .map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))
          ) : (
            <option value="">Không có suất chiếu</option>
          )}
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