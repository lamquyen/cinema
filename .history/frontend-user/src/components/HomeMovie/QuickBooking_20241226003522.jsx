import React, { useState, useEffect } from "react";
import axios from "axios";

const QuickBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [noShowtimes, setNoShowtimes] = useState(false);
  const [showtimes, setShowtimes] = useState([]);  // Thêm state cho showtimes

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/movies/released");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchCinemasByMovieId = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/showtimes/${movieId}`
      );
      const showtimesData = response.data;

      if (showtimesData.length === 0) {
        setCinemas([]);
        setNoShowtimes(true);
      } else {
        const cinemaList = showtimesData.map((showtime) => showtime.cinema.cinemaName);
        setCinemas([...new Set(cinemaList)]);
        setShowtimes(showtimesData);  // Lưu danh sách showtimes
        setNoShowtimes(false);
      }
    } catch (error) {
      console.error("Error fetching cinemas:", error);
      setCinemas([]);
      setNoShowtimes(true);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      fetchCinemasByMovieId(selectedMovie);
    }
  }, [selectedMovie]);

  // Hàm lấy danh sách ngày chiếu từ showtimes
  const getDaysFromShowtimes = () => {
    const daysList = showtimes.map((showtime) => showtime.days).flat();
    return [...new Set(daysList)]; // Lấy các ngày duy nhất
  };

  return (
    <div className="quick-booking-container">
      {/* Dropdown chọn phim */}
      <div>
        <select
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="" disabled>
            Chọn Phim
          </option>
          {movies.map((movie) => (
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
            onChange={(e) => setSelectedDate(e.target.value)}
            disabled={!selectedCinema}
          >
            <option value="" disabled>
              Chọn Ngày
            </option>
            {getDaysFromShowtimes().map((day, index) => (
              <option key={index} value={day}>
                {new Date(day).toLocaleDateString()} {/* Định dạng ngày */}
              </option>
            ))}
          </select>

      </div>

      {/* Dropdown chọn suất chiếu */}
      <div>
        {selectedDate && showtimes.length > 0 ? (
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            disabled={!selectedDate}
          >
            <option value="" disabled>
              Chọn Suất
            </option>
            {showtimes
              .filter((showtime) => showtime.days.includes(selectedDate)) // Lọc các suất chiếu theo ngày đã chọn
              .map((showtime, index) => (
                <option key={index} value={showtime.times}>
                  {showtime.times}
                </option>
              ))}
          </select>
        ) : null}
      </div>
    </div>
  );
};

export default QuickBooking;