import React, { useState } from "react";

const QuickBooking = () => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Dữ liệu mẫu
  const movies = ["Phim A", "Phim B", "Phim C"];
  const cinemas = ["Rạp 1", "Rạp 2", "Rạp 3"];
  const dates = ["2023-12-01", "2023-12-02", "2023-12-03"];
  const times = ["10:00", "13:00", "16:00"];

  // Hàm xử lý chọn phim
  const handleMovieChange = (event) => setSelectedMovie(event.target.value);
  const handleCinemaChange = (event) => setSelectedCinema(event.target.value);
  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleTimeChange = (event) => setSelectedTime(event.target.value);

  const handleBooking = () => {
    if (selectedMovie && selectedCinema && selectedDate && selectedTime) {
      alert(
        `Bạn đã đặt vé:\nPhim: ${selectedMovie}\nRạp: ${selectedCinema}\nNgày: ${selectedDate}\nSuất: ${selectedTime}`
      );
    } else {
      alert("Vui lòng chọn đầy đủ thông tin!");
    }
  };

  return (
    <div className="quick-booking-container bg-white p-4 shadow-lg rounded-lg">
      <div className="flex justify-between items-center gap-4">
        {/* Chọn phim */}
        <div>
          
          <select
            className="border rounded-md px-4 py-2 w-full"
            value={selectedMovie}
            onChange={handleMovieChange}
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

        {/* Chọn rạp */}
        <div>
          
          <select
            className="border rounded-md px-4 py-2 w-full"
            value={selectedCinema}
            onChange={handleCinemaChange}
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

        {/* Chọn ngày */}
        <div>
          <select
            className="border rounded-md px-4 py-2 w-full"
            value={selectedDate}
            onChange={handleDateChange}
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

        {/* Chọn suất */}
        <div>
          <select
            className="border rounded-md px-12 py-1 w-full"
            value={selectedTime}
            onChange={handleTimeChange}
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
          className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600 disabled:opacity-50"
          onClick={handleBooking}
          disabled={!selectedMovie || !selectedCinema || !selectedDate || !selectedTime}
        >
          Mua vé nhanh
        </button>
      </div>
    </div>
  );
};

export default QuickBooking;
