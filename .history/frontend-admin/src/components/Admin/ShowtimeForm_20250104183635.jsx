import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowtimeForm({
  onClose,
  cinemaName,
  roomNumber,
  selectedDate,
  cinemaId,
  timeSlots, // Nhận timeSlots từ props
}) {
  const [selectedCinema, setSelectedCinema] = useState(cinemaId); // Giữ cinemaId từ props
  const [selectedRoom, setSelectedRoom] = useState(roomNumber); // Giữ roomNumber từ props
  const [selectedMovie, setSelectedMovie] = useState(null); // Giữ thông tin phim đã chọn
  const [movies, setMovies] = useState([]); // Danh sách phim
  const [showDate, setShowDate] = useState(""); // Lưu giá trị showDate của phim đã chọn
  const [times, setTimes] = useState(""); // Lưu giờ chiếu
  const [showtimeDate, setShowtimeDate] = useState(""); // Lưu ngày chiếu
  const [days, setDays] = useState([]); // Lưu ngày trong tuần (selectedDate)

  // Fetch danh sách phim đã phát hành
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/movies/released"
        );
        setMovies(response.data); // Lưu danh sách phim vào state
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Xử lý khi người dùng chọn một bộ phim
  const handleMovieChange = (e) => {
    const movieId = e.target.value;
    const movie = movies.find((m) => m._id === movieId); // Tìm phim theo ID
    setSelectedMovie(movie); // Cập nhật phim đã chọn

    if (movie) {
      setShowDate(movie.showDate); // Cập nhật showDate của phim
    }
  };

  // Gửi dữ liệu form lên server
  const handleSubmit = (e) => {
    e.preventDefault();

    const showtimeData = {
      cinema: cinemaId, // Lấy cinemaId từ props
      movie: selectedMovie?._id, // Lấy movieId từ selectedMovie
      date: showDate, // Lấy showDate từ state
      days: selectedDate, // Lấy days từ selectedDate (props)
      times, // Lấy giờ chiếu từ state
      room: selectedRoom, // Lấy roomNumber từ props
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
          <input
            type="text"
            id="cinema"
            value={cinemaName} // Hiển thị cinemaName
            disabled // Không cho phép thay đổi
          />
        </div>

        {/* Room Selection */}
        <div className="form-group">
          <label htmlFor="room">ID Phòng chiếu</label>
          <input
            type="text"
            id="room"
            value={roomNumber} // Hiển thị roomNumber
            disabled // Không cho phép thay đổi
          />
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
          <label htmlFor="showDate">Ngày chiếu</label>
          <input
            type="text"
            id="showDate"
            value={showDate} // Hiển thị showDate của phim
            disabled // Không cho phép thay đổi
          />
        </div>

            {/* TimeSlots (Read-only) */}
            <div className="form-group">
          <label htmlFor="timeSlots">Thời gian chiếu có sẵn</label>
          <div style={{marginBottom:"5px"}}>
            {timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <div key={index}>
                  {slot.start} - {slot.end}
                </div>
              ))
            ) : (
              <p>Không có thời gian chiếu nào.</p>
            )}
          </div>
        </div>

        {/* Showtime Times (User input) */}
        <div className="form-group">
          <label htmlFor="times">Giờ chiếu</label>
          <input
            type="time"
            id="times"
            value={times}
            onChange={(e) => setTimes(e.target.value)} // Cập nhật giờ chiếu khi người dùng chọn
            placeholder="Nhập giờ chiếu"
          />
        </div>

        {/* Days of the week */}
        <div className="form-group">
          <label htmlFor="days">Ngày trong tuần</label>
          <input
            type="text"
            id="days"
            value={selectedDate} // Hiển thị selectedDate từ props
            disabled // Không cho phép thay đổi
          />
        </div>

        {/* Submit Button */}
        <div className="buttons">
          <button type="button" onClick={onClose}>
            Hủy
          </button>
          <button type="submit">Lưu</button>
        </div>
      </form>
    </div>
  );
}

export default ShowtimeForm;