import React, { useState, useEffect } from "react";
import axios from "axios";

const QuickBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showingMovies, setShowingMovies] = useState([]); // Danh sách phim
  const [cinemas, setCinemas] = useState([]); // Danh sách rạp
  const [noShowtimes, setNoShowtimes] = useState(false);

  const dates = ["2023-12-01", "2023-12-02", "2023-12-03"];
  const times = ["10:00", "13:00", "16:00"];

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

  const fetchCinemasByMovieId = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/showtimes/movie/${movieId}`
      );
  
      const showtimes = response.data;
  
      if (showtimes.length === 0) {
        // Nếu không có suất chiếu
        setCinemas([]);
        setNoShowtimes(true); // Đặt trạng thái không có suất chiếu
      } else {
        // Lấy danh sách tên rạp
        const cinemaList = showtimes.map((showtime) => showtime.cinema.cinemaName);
        setCinemas([...new Set(cinemaList)]);
        setNoShowtimes(false); // Đặt trạng thái có suất chiếu
      }
    } catch (error) {
      console.error("Error fetching cinemas:", error);
      setCinemas([]);
      setNoShowtimes(true); // Giả định lỗi cũng là không có suất chiếu
    }
  };
  

  // Xử lý khi chọn phim
  const handleMovieChange = (movieId) => {
    setSelectedMovie(movieId);
    setSelectedCinema(""); // Reset selectedCinema khi chọn phim mới
    fetchCinemasByMovieId(movieId); // Gọi API lấy danh sách rạp
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
  {noShowtimes ? (
    alert("Phim đã hết suất chiếu trong ngày")
  ) : cinemas.length > 0 ? (
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
  ):null}
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
          {times.map((time, index) => (
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