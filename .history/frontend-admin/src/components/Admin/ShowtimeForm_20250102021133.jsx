import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowtimeForm({ onClose, cinemaName, roomNumber,selectedDate, cinemaId ,setSelectedDate }) {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [movie, setMovie] = useState("");
  const [times, setTimes] = useState("");
  const [days, setDays] = useState([]);
  const [showtimeDate, setShowtimeDate] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);  // Giữ thông tin phim đã chọn
  const [movies, setMovies] = useState([]);
  


console.log(selectedDate)

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
    // Call the API to create a showtime
    axios
      .post("http://localhost:5000/api/showtimes", showtimeData)
      .then((response) => {
        console.log("Showtime created:", response.data);
        onClose(); // Close form after submission
      })
      .catch((error) => {
        console.error("Error creating showtime:", error);
      });
  };

  useEffect(() => {
    // Fetch danh sách phim đã phát hành
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies/released');
        setMovies(response.data);  // Lưu danh sách phim vào state
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };

 // Xử lý khi người dùng chọn một bộ phim
 const handleMovieChange = (e) => {
  const movieId = e.target.value;
  const movie = movies.find((m) => m._id === movieId);  // Tìm phim theo ID
  setSelectedMovie(movie);  // Cập nhật phim đã chọn

  if (movie) {
    setSelectedDate(movie.showDate);  // Cập nhật selectedDate theo showDate của phim
  }
};

  return (
    <div className="showtime-form">
      <h2>Thêm lịch chiếu</h2>
      <form onSubmit={handleSubmit}>
        {/* Cinema Selection */}
        <div className="form-group">
          <label htmlFor="cinema"> Cinema</label>
        <p>{cinemaName}</p>
        </div>

        {/* Room Selection */}
        <div className="form-group">
          <label htmlFor="room">Rạp ID</label>
        <p>{roomNumber}</p>
        </div>
 {/* Chọn phim */}
 <div className="form-group">
          <label htmlFor="movie">Chọn phim</label>
          <select
            id="movie"
            value={selectedMovie?._id || ""}
            onChange={handleMovieChange}
          >
            <option value="" disabled>Chọn phim</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày chiếu (Cập nhật theo phim đã chọn hoặc có thể thay đổi bởi người dùng) */}
        <div className="form-group">
          <label htmlFor="date">Ngày chiếu</label>
          <input
            type="date"
            id="date"
            value={selectedDate}  // Sử dụng selectedDate thay vì showDate
            onChange={(e) => setSelectedDate(e.target.value)}  // Cho phép người dùng thay đổi ngày chiếu
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