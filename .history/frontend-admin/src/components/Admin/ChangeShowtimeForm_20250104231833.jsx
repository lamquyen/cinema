import React, { useState, useEffect } from "react";
import axios from "axios";

function ChangeShowtimeForm({ onClose, showtime, onSave }) {
  const [movies, setMovies] = useState([]); // Danh sách phim
  const [selectedMovieId, setSelectedMovieId] = useState(
    showtime.movie?._id || ""
  ); // ID phim được chọn
  const [newTime, setNewTime] = useState(showtime.times || ""); // Giờ chiếu mới

  // Fetch danh sách phim khi component được render
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

  const handleSave = async () => {
    const showtimeId = showtime._id; // ID suất chiếu
    const updatedShowtime = {
      movie: selectedMovieId, // Gửi ID phim mới
      times: newTime, // Giờ chiếu mới
    };

    try {
      // Gửi yêu cầu PUT đến API
      await axios.put(
        `http://localhost:5000/api/showtimes/update-showtime/${showtimeId}`,
        updatedShowtime
      );

      // Thông báo thành công và gọi hàm onSave
      alert("Cập nhật lịch chiếu thành công!");
      onSave({ ...showtime, movie: { _id: selectedMovieId }, times: newTime });
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật lịch chiếu:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="form-container">
      <h3>Thay đổi lịch chiếu</h3>

      <label htmlFor="newMovie">Chọn phim mới:</label>
      <select
        id="newMovie"
        value={selectedMovieId}
        onChange={(e) => setSelectedMovieId(e.target.value)}
      >
        <option value="">-- Chọn phim --</option>
        {movies.map((movie) => (
          <option key={movie._id} value={movie._id}>
            {movie.title}
          </option>
        ))}
      </select>

      <label htmlFor="newTime">Giờ chiếu mới:</label>
      <input
        id="newTime"
        type="time"
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)}
      />

      <div className="form-actions">
        <button onClick={handleSave}>Lưu</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
}

export default ChangeShowtimeForm;