import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";
import "moment/locale/vi";

const MoviePage = ({ cinemaLocation }) => {
  const [showtimes, setShowtimes] = useState([]);
  const [error, setError] = useState("");
  

  useEffect(() => {
    async function fetchShowtimes() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/showtimes/location/${cinemaLocation}`
        );
        setShowtimes(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu suất chiếu.");
      }
    }

    fetchShowtimes();
  }, [cinemaLocation]);

  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const movieId = showtime.movie._id;
    if (!acc[movieId]) {
      acc[movieId] = {
        movie: showtime.movie,
        times: [],
      };
    }
    acc[movieId].times.push(showtime.times);
    return acc;
  }, {});

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
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

  const handleMovieClick = (movieId) => {
    // Nếu phim đang được chọn, bỏ chọn (ẩn suất chiếu)
    if (selectedMovie === movieId) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movieId); // Nếu không, chọn phim mới và hiển thị suất chiếu
    }
  };

  return (
    <div>
    <ShowtimeSelector
                      weekDays={weekDays}
                      startIndex={startIndex}
                      daysToShow={daysToShow}
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      handleNext={handleNext}
                      handlePrev={handlePrev}
                    />
                    <div class="line"></div>
      {error && <p className="text-red-500">{error}</p>}
      <MovieList
        groupedShowtimes={groupedShowtimes}
      />
    </div>
  );
};

export default MoviePage;
