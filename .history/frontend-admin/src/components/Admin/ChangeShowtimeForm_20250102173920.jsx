import React, { useState } from "react";

function ChangeShowtimeForm({ onClose, showtime, onSave }) {
  const [newTime, setNewTime] = useState(showtime.times);

  const handleSave = () => {
    onSave({ ...showtime, times: newTime });
    onClose();
  };

  return (
    <div className="form-container">
      <h3>Thay đổi lịch chiếu</h3>
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