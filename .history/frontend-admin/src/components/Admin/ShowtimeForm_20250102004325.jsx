import React, { useState } from "react";
import axios from "axios";

const ShowtimeForm = ({ onClose, cinemaId, roomId }) => {
  const [movie, setMovie] = useState("");
  const [time, setTime] = useState("");
  const availableMovies = ["Phim A", "Phim B", "Phim C"]; // Danh sách phim có sẵn

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu để gửi API
    const showtimeData = {
      cinema: cinemaId,
      movie,
      room: roomId,
      date: new Date().toISOString().split("T")[0], // Lấy ngày hiện tại
      days: [new Date().toISOString()], // Một ngày (có thể chỉnh sửa)
      times: [time],
    };

    try {
      // Gửi API tạo suất chiếu
      const response = await axios.post(
        "http://localhost:5000/api/showtimes",
        showtimeData
      );
      console.log("Tạo suất chiếu thành công:", response.data);
      onClose(); // Đóng form sau khi thành công
    } catch (error) {
      console.error("Lỗi khi tạo suất chiếu:", error.response?.data || error);
      alert("Không thể thêm suất chiếu. Vui lòng thử lại.");
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Thêm Suất Chiếu</h2>
        <form onSubmit={handleSubmit}>
          {/* Chọn phim */}
          <div className="form-group">
            <label>Chọn Phim</label>
            <select
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              required
            >
              <option value="">-- Chọn Phim --</option>
              {availableMovies.map((m, index) => (
                <option key={index} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn giờ */}
          <div className="form-group">
            <label>Giờ Chiếu</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* Nút hành động */}
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Thêm Suất Chiếu
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowtimeForm;
