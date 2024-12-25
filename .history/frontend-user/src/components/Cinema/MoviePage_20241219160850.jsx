import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowtimeSelector from "./ShowtimeSelector";
import MovieList from "./MovieList";

const MoviePage = ({ cinemaLocation }) => {
  const [showtimes, setShowtimes] = useState([]);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const daysToShow = 5; // Số ngày hiển thị cùng lúc
  const weekDays = Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return {
      fullDate: date.toISOString().split("T")[0], // Định dạng YYYY-MM-DD
      day: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][date.getDay()],
      date: date.getDate(),
    };
  });

  useEffect(() => {
    async function fetchShowtimes() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/showtimes/location/${cinemaLocation}`
        );
        setShowtimes(response.data);
        setSelectedDate(weekDays[0].fullDate); // Mặc định chọn ngày đầu tiên
      } catch (err) {
        setError("Không thể tải dữ liệu suất chiếu.");
      }
    }

    fetchShowtimes();
  }, [cinemaLocation]);

  // Nhóm suất chiếu theo ID phim
  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const movieId = showtime.movie._id;
    if (!acc[movieId]) {
      acc[movieId] = {
        movie: showtime.movie,
        times: [],
      };
    }
    // Chỉ thêm suất chiếu nếu ngày trùng với `selectedDate`
    if (showtime.date.split("T")[0] === selectedDate) {
      acc[movieId].times.push(showtime.times);
    }
    return acc;
  }, {});

  // Xử lý chuyển ngày
  const handleNext = () => {
    if (startIndex + daysToShow < weekDays.length) {
      setStartIndex(startIndex + daysToShow);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - daysToShow);
    }
  };

  return (
    <div className="container mx-auto">
      {error && <p className="text-red-500">{error}</p>}

      {/* Bộ chọn ngày */}
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
      {/* Danh sách phim */}
      <MovieList
        groupedShowtimes={groupedShowtimes}
        onTimeClick={(movieId, time) =>
          console.log(`Chọn phim: ${movieId}, giờ chiếu: ${time}`)
        }
      />
    </div>
  );
};

export default MoviePage;

