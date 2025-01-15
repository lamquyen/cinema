import React, { useState } from "react";

const ShowtimeForm = ({ onClose }) => {
  const [movie, setMovie] = useState("");
  const [time, setTime] = useState("");
  const availableMovies = ["Phim A", "Phim B", "Phim C"]; // Danh sách phim có sẵn

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { movie, time });
    onClose(); // Đóng form sau khi submit
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
