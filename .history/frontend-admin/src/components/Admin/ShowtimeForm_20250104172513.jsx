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
  const [selectedCinema, setSelectedCinema] = useState(cinemaId);
  const [selectedRoom, setSelectedRoom] = useState(roomNumber);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showDate, setShowDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null); // Lưu khung giờ được chọn
  const [showtimeDate, setShowtimeDate] = useState("");
  const [days, setDays] = useState([]);

  // Fetch danh sách phim đã phát hành
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/movies/released"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Xử lý khi người dùng chọn phim
  const handleMovieChange = (e) => {
    const movieId = e.target.value;
    const movie = movies.find((m) => m._id === movieId);
    setSelectedMovie(movie);

    if (movie) {
      setShowDate(movie.showDate);
    }
  };

  // Gửi dữ liệu form lên server
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert("Vui lòng chọn một khung giờ!");
      return;
    }

    const showtimeData = {
      cinema: cinemaId,
      movie: selectedMovie?._id,
      date: showDate,
      days: selectedDate,
      times: `${selectedSlot.start} - ${selectedSlot.end}`, // Lấy thời gian từ khung giờ
      room: selectedRoom,
    };

    axios
      .post("http://localhost:5000/api/showtimes", showtimeData)
      .then((response) => {
        console.log("Showtime created:", response.data);
        onClose();
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
            value={cinemaName}
            disabled
          />
        </div>

        {/* Room Selection */}
        <div className="form-group">
          <label htmlFor="room">ID Phòng chiếu</label>
          <input
            type="text"
            id="room"
            value={roomNumber}
            disabled
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
            value={showDate}
            disabled
          />
        </div>

        {/* Time Slot Selection */}
        <div className="form-group">
          <label htmlFor="timeSlot">Khung giờ</label>
          <ul className="time-slots">
            {timeSlots.map((slot, index) => (
              <li
                key={index}
                style={{
                  cursor: "pointer",
                  padding: "5px",
                  backgroundColor:
                    selectedSlot === slot ? "lightblue" : "transparent",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginBottom: "5px",
                }}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot.start} - {slot.end}
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Date */}
        <div className="form-group">
          <label htmlFor="days">Ngày trong tuần</label>
          <input
            type="text"
            id="days"
            value={selectedDate}
            disabled
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
