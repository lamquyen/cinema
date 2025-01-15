import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import ShowtimeSelector from "./ShowtimeSelector";
import ShowtimeForm from "./ShowtimeForm";
import moment from "moment";

// Hàm viết hoa chữ cái đầu
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Hàm tính danh sách các ngày trong tuần
const getWeekDays = () => {
  const days = [];
  for (let i = 0; i < 14; i++) {
    const date = moment().add(i, "days");
    days.push({
      day: capitalizeFirstLetter(date.format("dddd")),
      date: date.format("DD/MM"),
      fullDate: date.format("YYYY-MM-DD"),
    });
  }
  return days;
};

function Screening() {
  const [cinemas, setCinemas] = useState([]); // Danh sách rạp chiếu
  const [showtimes, setShowtimes] = useState({}); // Chi tiết suất chiếu theo rạp
  const [selectedDate, setSelectedDate] = useState(getWeekDays()[0].fullDate); // Ngày được chọn
  const [selectedRoom, setSelectedRoom] = useState(null); // Phòng được chọn
  const [isFormVisible, setIsFormVisible] = useState(false); // Hiển thị form

  const weekDays = getWeekDays();

  // Lấy danh sách rạp và suất chiếu
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cinemas");
        const cinemasData = response.data;
        setCinemas(cinemasData);
        fetchShowtimes(cinemasData);
      } catch (error) {
        console.error("Error fetching cinemas:", error);
      }
    };

    const fetchShowtimes = async (cinemas) => {
      try {
        const showtimesData = {};
        for (const cinema of cinemas) {
          const response = await axios.get(
            `http://localhost:5000/api/showtimes/cinema/${cinema._id}`
          );
          showtimesData[cinema._id] = response.data;
        }
        setShowtimes(showtimesData);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };

    fetchCinemas();
  }, []);

  // Lọc suất chiếu theo phòng và ngày
  const getRoomShowtimes = () => {
    if (!selectedRoom || !showtimes[selectedRoom.cinemaId]) return [];
    return showtimes[selectedRoom.cinemaId].filter(
      (showtime) =>
        showtime.room === selectedRoom.roomId &&
        moment(showtime.date).format("YYYY-MM-DD") === selectedDate
    );
  };

  return (
    <div className="container">
      <SideBar />
      {isFormVisible && <ShowtimeForm onClose={() => setIsFormVisible(false)} />}
      <div className="main">
        <h2 className="subtitle">Screening Management</h2>

        {/* Showtime Selector */}
        <ShowtimeSelector
          weekDays={weekDays}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {cinemas.map((cinema) => (
          <div key={cinema._id} className="dropdown-container">
            <div className="dropdown-title">{cinema.cinemaName}</div>
            <div className="dropdown-menu">
              <div className="screen">
                <div className="room">
                  {cinema.room.map((roomId, index) => (
                    <div
                      key={roomId}
                      className="room-number"
                      onClick={() =>
                        setSelectedRoom({ cinemaId: cinema._id, roomId })
                      }
                    >
                      <h3>Rạp {index + 1}</h3>
                      <p>Click để xem suất chiếu</p>
                    </div>
                  ))}
                </div>

                {/* Hiển thị suất chiếu nếu phòng được chọn */}
                {selectedRoom &&
                  selectedRoom.cinemaId === cinema._id &&
                  getRoomShowtimes().length > 0 && (
                    <div className="showtimes">
                      {getRoomShowtimes().map((showtime, idx) => (
                        <div key={showtime._id} className="box-showtime">
                          <h4>
                            Suất {idx + 1} - {showtime.times}
                          </h4>
                          <p>
                            Tên phim: <span>{showtime.movie.title}</span>
                          </p>
                          <img
                            src={showtime.movie.img}
                            alt={showtime.movie.title}
                            style={{ width: "100px" }}
                          />
                          <p>Ngày: {moment(showtime.date).format("DD/MM/YYYY")}</p>
                          <p>Thời gian: {showtime.times}</p>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Screening;