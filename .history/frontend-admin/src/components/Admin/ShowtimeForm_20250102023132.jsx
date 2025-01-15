import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowtimeForm({ onClose, cinemaName, roomNumber, selectedDate, cinemaId }) {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [movie, setMovie] = useState("");
  const [times, setTimes] = useState("");
  const [days, setDays] = useState([]);
  const [showtimeDate, setShowtimeDate] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);  // Giữ thông tin phim đã chọn
  const [movies, setMovies] = useState([]);  // Danh sách phim
  const [showDate, setShowDate] = useState(""); // Lưu giá trị showDate của phim

  // Fetch danh sách phim đã phát hành
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies/released");
        setMovies(response.data);  // Lưu danh sách phim vào state
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Xử lý khi người dùng chọn một bộ phim
  const handleMovieChange = (e) => {
    const movieId = e.target.value;
    const movie = movies.find((m) => m._id === movieId);  // Tìm phim theo ID
    setSelectedMovie(movie);  // Cập nhật phim đã chọn

    if (movie) {
      setShowDate(movie.showDate);  // Cập nhật showDate của phim
    }
  };

  // Xử lý khi người dùng chọn phòng chiếu
  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  // Xử lý khi người dùng chọn cụm rạp
  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  // Gửi dữ liệu form lên server
  const handleSubmit = (e) => {
    e.preventDefault();

    const showtimeData = {
      cinema: selectedCinema,
      movie,
      date: showtimeDate,
      days,
      times,
      room: selectedRoom,
    };

    // Gọi API để tạo lịch chiếu
    axios
      .post("http://localhost:5000/api/showtimes", showtimeData)
      .then((response) => {
        console.log("Showtime created:", response.data);
        onClose(); // Đóng form sau khi submit thành công
      })
      .catch((error) => {
        console.error("Error creating showtime:", error);
      });
  };

  return (
    <div className="showtime-form">
      <h2>Thêm lịch chiếu</h2>
      <form onSubmit={handleSubmit}>

        {/* Cinema Selection */}
        <div className="form-group">
          <label htmlFor="cinema">Cụm rạp</label>
          <p>{cinemaName}</p>
        </div>

        {/* Room Selection */}
        <div className="form-group">
          <label htmlFor="room">Phòng chiếu</label>
          <p>{roomNumber}</p>
        </div>

        {/* Movie Selection */}
        <div className="form-group">
          <label htmlFor="movie">Chọn phim</label>
          <select
            id="movie"
            value={selectedMovie?._id || ""}
            onChange={handleMovieChange}
          >
            <option value="" disabled>
              Chọn phim
            </option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        {/* Show Date */}
        <div className="form-group">
          <label htmlFor="date">Ngày chiếu</label>
          <input
            type="text"
            id="date"
            value={showDate}  // Hiển thị showDate
            disabled  // Không cho phép thay đổi
          />
        </div>

        {/* Showtime Times */}
        <div className="form-group">
          <label htmlFor="times">Giờ chiếu</label>
          <input
            type="text"
            id="times"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
            placeholder="Nhập giờ chiếu"
          />
        </div>

        {/* Days of the week */}
        <div className="form-group">
          <label htmlFor="days">Ngày trong tuần</label>
          <p>{selectedDate}</p>
        </div>

        {/* Submit Button */}
        <div className="buttons">
          <button type="submit">Lưu</button>
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShowtimeForm;