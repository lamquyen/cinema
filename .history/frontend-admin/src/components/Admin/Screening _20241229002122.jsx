import React, { useEffect, useState } from "react";
import axios from "axios";

const Screening = () => {
  const [cinemas, setCinemas] = useState([]); // Lưu danh sách rạp chiếu phim
  const [selectedCinema, setSelectedCinema] = useState(null); // Rạp đang được chọn

  // Gọi API để lấy dữ liệu rạp
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cinemas");
        setCinemas(response.data); // Lưu dữ liệu rạp vào state
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchCinemas();
  }, []);

  return (
    <div>
      <h1>Danh Sách Rạp</h1>
      {/* Hiển thị danh sách rạp */}
      <ul>
        {cinemas.map((cinema) => (
          <li key={cinema._id}>
            <button onClick={() => setSelectedCinema(cinema)}>
              {cinema.cinemaName}
            </button>
          </li>
        ))}
      </ul>

      {/* Hiển thị phòng chiếu của rạp đã chọn */}
      {selectedCinema && (
        <div>
          <h2>{selectedCinema.cinemaName}</h2>
          <p>Địa chỉ: {selectedCinema.address}</p>
          <h3>Danh Sách Phòng Chiếu</h3>
          <ul>
            {selectedCinema.room.map((roomId) => (
              <li key={roomId}>Phòng: {roomId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Screening;
