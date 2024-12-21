import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";
import "moment/locale/vi";

const MoviePage = ({ cinemaLocation }) => {
  const [showtimes, setShowtimes] = useState([]);
  const [error, setError] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD")); // Ngày được chọn

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

  // Gom nhóm suất chiếu theo movieId và ngày chiếu
  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const movieId = showtime.movie._id;
    const date = showtime.date;

    if (!acc[movieId]) {
      acc[movieId] = {
        movie: showtime.movie,
        times: {},
        dates: [],
      };
    }

    // Nếu ngày chưa có trong `times`, khởi tạo
    if (!acc[movieId].times[date]) {
      acc[movieId].times[date] = [];
      acc[movieId].dates.push(date);
    }

    // Thêm giờ chiếu vào ngày tương ứng
    acc[movieId].times[date].push(showtime.time);

    return acc;
  }, {});

  const daysToShow = 3;

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Tạo danh sách các ngày trong tuần
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
    if (startIndex + daysToShow < weekDays.length) {
      setStartIndex(startIndex + 2);
    }
  };

  const handlePrev = () => {
    if (startIndex - 2 >= 0) {
      setStartIndex(startIndex - 2);
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
      <div className="line"></div>
      {error && <p className="text-red-500">{error}</p>}
      <MovieList
        groupedShowtimes={groupedShowtimes}
        selectedDate={selectedDate} // Truyền ngày được chọn
        onTimeClick={(movieId, time) => {
          console.log("Chọn suất chiếu:", movieId, time);
        }}
      />
    </div>
  );
};

export default MoviePage;