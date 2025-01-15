import React, { useState } from "react";
import axios from "axios";

function ChangeShowtimeForm({ onClose, showtime, onSave }) {
  const [newMovie, setNewMovie] = useState(showtime.movie?.title || ""); // Tên phim
  const [newTime, setNewTime] = useState(showtime.times || ""); // Giờ chiếu

  const handleSave = async () => {
    const showtimeId = showtime._id; // Lấy ID suất chiếu
    const updatedShowtime = {
      movie: { ...showtime.movie, title: newMovie }, // Thay đổi tên phim
      times: newTime, // Thay đổi giờ chiếu
    };

    try {
      // Gửi yêu cầu PUT đến API
      await axios.put(
        `http://localhost:5000/api/showtimes/update-showtime/${showtimeId}`,
        updatedShowtime
      );

      // Thông báo thành công và gọi hàm onSave
      alert("Cập nhật lịch chiếu thành công!");
      onSave({ ...showtime, ...updatedShowtime });
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật lịch chiếu:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="form-container">
      <h3>Thay đổi lịch chiếu</h3>

      <label htmlFor="newMovie">Tên phim mới:</label>
      <input
        id="newMovie"
        type="text"
        value={newMovie}
        onChange={(e) => setNewMovie(e.target.value)}
      />

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