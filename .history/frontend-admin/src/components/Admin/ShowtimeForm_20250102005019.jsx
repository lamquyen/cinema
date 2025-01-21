import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowtimeForm = ({ onClose, cinemaId, roomId }) => {
  // Khai báo state để quản lý dữ liệu form
  const [cinema, setCinema] = useState(cinemaId || "");
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState([]);
  const [times, setTimes] = useState([]);
  const [room, setRoom] = useState(roomId || "");

  const [cinemaOptions, setCinemaOptions] = useState([]);
  const [movieOptions, setMovieOptions] = useState([]);

  useEffect(() => {
    // Lấy danh sách các rạp từ API khi mở form
    axios
      .get("http://localhost:5000/api/cinemas")
      .then((response) => {
        setCinemaOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cinemas:", error);
      });

    // Lấy danh sách các phim từ API
    axios
      .get("http://localhost:5000/api/movies")
      .then((response) => {
        setMovieOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo dữ liệu cho API
    const showtimeData = {
      cinema: cinemaId,  // Sử dụng cinemaId từ props
      movie,
      date,
      days,
      times,
      room: roomId,  // Sử dụng roomId từ props
    };

    // Gửi dữ liệu đến API để tạo lịch chiếu
    try {
      const response = await axios.post("http://localhost:5000/api/showtimes", showtimeData);
      console.log("Showtime created:", response.data);
      onClose(); // Đóng form sau khi tạo lịch chiếu thành công
    } catch (error) {
      console.error("Error creating showtime:", error);
    }
  };

  return (
    <div className="showtime-form">
      <form onSubmit={handleSubmit}>
        <h2>Thêm Lịch Chiếu</h2>

        <label htmlFor="cinema">Chọn Rạp:</label>
        <select
          id="cinema"
          value={cinema}
          onChange={(e) => setCinema(e.target.value)}
        >
          <option value="">Chọn Rạp</option>
          {cinemaOptions.map((cinema) => (
            <option key={cinema.id} value={cinema.id}>
              {cinema.name}
            </option>
          ))}
        </select>

        <label htmlFor="movie">Chọn Phim:</label>
        <select
          id="movie"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        >
          <option value="">Chọn Phim</option>
          {movieOptions.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>

        <label htmlFor="date">Ngày chiếu:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="days">Ngày trong tuần:</label>
        <input
          type="text"
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value.split(",").map(day => day.trim()))}
          placeholder="Nhập các ngày trong tuần, ví dụ: Thứ 2, Thứ 4, Thứ 6"
        />

        <label htmlFor="times">Giờ chiếu:</label>
        <input
          type="text"
          id="times"
          value={times}
          onChange={(e) => setTimes(e.target.value.split(",").map(time => time.trim()))}
          placeholder="Nhập các giờ chiếu, ví dụ: 10:00, 14:00"
        />

        <label htmlFor="room">Chọn Phòng:</label>
        <select
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="">Chọn Phòng</option>
          {cinemaOptions
            .find((cinemaOption) => cinemaOption.id === cinema)?.rooms?.map((room) => (
              <option key={room.id} value={room.id}>
                Phòng {room.name}
              </option>
            ))}
        </select>

        <div className="buttons">
          <button type="submit">Lưu</button>
          <button type="button" onClick={onClose}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default ShowtimeForm;
