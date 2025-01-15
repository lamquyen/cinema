import React, { useState } from "react";
import SideBar from "./SideBar";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";

// Hàm viết hoa chữ cái đầu
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Hàm tính danh sách các ngày trong tuần
const getWeekDays = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
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
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Trạng thái mở của dropdown
  const [selectedRoom, setSelectedRoom] = useState(null); // Phòng được chọn

  // Dữ liệu mẫu
  const sampleData = {
    theaters: [
      {
        name: "Galaxy Tân Bình",
        rooms: [
          {
            name: "Rạp 1",
            showtimes: [
              {
                timeRange: "9:00-12:00",
                movie: {
                  title: "Phim A",
                  duration: 90,
                  status: "Phim đã chiếu",
                  poster: "url-to-poster-A.jpg",
                },
              },
              {
                timeRange: "13:00-16:00",
                movie: {
                  title: "Phim B",
                  duration: 100,
                  status: "Phim đang chiếu",
                  poster: "url-to-poster-B.jpg",
                },
              },
              {
                timeRange: "17:00-20:00",
                movie: {
                  title: "Phim C",
                  duration: 80,
                  status: "Đã có phim chiếu",
                  poster: "url-to-poster-C.jpg",
                },
              },
              {
                timeRange: "21:00",
                movie: null, // Rạp trống
              },
            ],
          },
          {
            name: "Rạp 2",
            showtimes: [/* Tương tự như trên */],
          },
        ],
      },
      {
        name: "Galaxy Nguyễn Trãi",
        rooms: [
          {
            name: "Rạp 1",
            showtimes: [/* Tương tự như trên */],
          },
        ],
      },
    ],
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="container">
      <SideBar />
      <div className="main">
        <h2 className="subtitle">Screening Management</h2>
        {sampleData.theaters.map((theater, theaterIndex) => (
          <div key={theater.name} className="dropdown-container">
            <div
              className="dropdown-title"
              onClick={() => toggleDropdown(theaterIndex)}
            >
              {theater.name}
            </div>
            {openDropdownIndex === theaterIndex && (
              <div className="dropdown-menu">
                <div className="screen">
                  <div className="room">
                    {theater.rooms.map((room) => (
                      <div
                        key={room.name}
                        className="room-number"
                        onClick={() => handleSelectRoom(room)}
                      >
                        <h3>{room.name}</h3>
                        <p>Số suất chiếu: {room.showtimes.length}/4</p>
                      </div>
                    ))}
                  </div>
                  {selectedRoom && (
                    <div className="showtimes">
                      {selectedRoom.showtimes.map((showtime, index) => (
                        <div key={index} className="box-showtime">
                          <h4>Suất chiếu {index + 1} ({showtime.timeRange})</h4>
                          {showtime.movie ? (
                            <>
                              <h5>{showtime.movie.status}</h5>
                              <div className="line"></div>
                              <div className="poster">
                                <img src={showtime.movie.poster} alt="Poster" />
                              </div>
                              <p>
                                Tên phim: <span>{showtime.movie.title}</span>
                              </p>
                              <p>
                                Thời gian: <span>{showtime.movie.duration} phút</span>
                              </p>
                              <a href="#" className="btn-room">
                                {showtime.movie.status === "Phim đang chiếu"
                                  ? "Thay đổi lịch chiếu"
                                  : "Xem doanh thu"}
                              </a>
                            </>
                          ) : (
                            <>
                              <h5>Rạp trống</h5>
                              <div className="line"></div>
                              <a href="#" className="btn-room">
                                Thêm lịch chiếu
                              </a>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Screening;