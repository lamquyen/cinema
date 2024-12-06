import React, { useState } from "react";

const QuickBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const movies = ["Phim A", "Phim B", "Phim C"];
  const cinemas = ["Rạp 1", "Rạp 2", "Rạp 3"];
  const dates = ["2023-12-01", "2023-12-02", "2023-12-03"];
  const times = ["10:00", "13:00", "16:00"];


  return (
    <div className="quick-booking-container">
      <div>
        <select
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="" disabled>
            Chọn Phim
          </option>
          {movies.map((movie, index) => (
            <option key={index} value={movie}>
              {movie}
            </option>
          ))}
        </select>
      </div>

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

      <button
        disabled={!selectedMovie || !selectedCinema || !selectedDate || !selectedTime}
      >
        Mua vé nhanh
      </button>
    </div>
  );
};

export default QuickBooking;