import React, { useState, useEffect } from "react";
import axios from "axios";

function ChangeShowtimeForm({ onClose, showtime, onSave, timeSlot }) {
  console.log("Received timeSlot:", timeSlot);

  const [movies, setMovies] = useState([]); // Danh sách phim
  const [selectedMovieId, setSelectedMovieId] = useState(
    showtime.movie?._id || ""
  ); // ID phim được chọn
  const [newTime, setNewTime] = useState(showtime.times || ""); // Giờ chiếu mới
  const [errorMessage, setErrorMessage] = useState(""); // Lưu thông báo lỗi nếu giờ không hợp lệ

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

  // Kiểm tra xem giờ nhập vào có nằm trong khung giờ hợp lệ không
  const validateTime = (inputTime) => {
    const inputParts = inputTime.split(":").map(Number);
    const inputDate = new Date(2020, 1, 1, inputParts[0], inputParts[1]); // Chuyển đổi giờ nhập vào thành đối tượng Date
  
    // Kiểm tra nếu giờ nhập vào nằm trong một khung giờ hợp lệ
    const selectedSlot = timeSlot.find((slot) => {
      const [startHour, startMinute] = slot.start.split(":").map(Number); // Tách giờ và phút từ thời gian bắt đầu
      const [endHour, endMinute] = slot.end.split(":").map(Number); // Tách giờ và phút từ thời gian kết thúc
  
      const startTime = new Date(2020, 1, 1, startHour, startMinute); // Khung giờ bắt đầu
      const endTime = new Date(2020, 1, 1, endHour, endMinute); // Khung giờ kết thúc
  
      // So sánh giờ nhập vào với khung giờ
      return inputDate >= startTime && inputDate <= endTime;
    });
  
    return selectedSlot;
  };
  

  const handleTimeChange = (e) => {
    const inputTime = e.target.value;
    setNewTime(inputTime); // Cập nhật giá trị giờ chiếu mới
  
    const validSlot = validateTime(inputTime);
  
    if (validSlot) {
      setErrorMessage(""); // Xóa lỗi nếu giờ hợp lệ
    } else {
      setErrorMessage("Giờ chiếu phải nằm trong các khung giờ đã chọn.");
    }
  };
  

  const handleSave = async () => {
    if (!selectedMovieId) {
      alert("Vui lòng chọn một bộ phim!");
      return;
    }

    if (!newTime || errorMessage) {
      alert("Vui lòng nhập giờ chiếu hợp lệ!");
      return;
    }

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

      {/* TimeSlots (Read-only) */}
      <div className="form-group">
      <label htmlFor="timeSlot">Khung giờ:</label>
      <div style={{ marginBottom: '10px' }}>
        {Array.isArray(timeSlot) && timeSlot.length > 0 ? (
          timeSlot.map((slot, index) => (
            <div key={index}>
              {slot.start} - {slot.end}
            </div>
          ))
        ) : (
          <p>Không có thời gian chiếu nào.</p>
        )}
      </div>
    </div>


      <div className="form-group">
        <label htmlFor="newTime">Giờ chiếu mới:</label>
        <input
          id="newTime"
          type="time"
          value={newTime}
          onChange={handleTimeChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="form-actions">
        <button onClick={handleSave}>Lưu</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
}

export default ChangeShowtimeForm;