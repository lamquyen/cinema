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

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/movies/released");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const times =["16:00","18:00","21:00"]

  const fetchCinemasByMovieId = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/showtimes/${movieId}`
      );
      const showtimes = response.data;

      if (showtimes.length === 0) {
        setCinemas([]);
        setNoShowtimes(true);
      } else {
        const cinemaList = showtimes.map((showtime) => showtime.cinema.cinemaName);
        setCinemas([...new Set(cinemaList)]);
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

  useEffect(() => {
    if (noShowtimes) {
      alert("Phim đã hết suất chiếu trong ngày");
    }
  }, [noShowtimes]);

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
        {cinemas.length > 0 ? (
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
        ) : null}
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