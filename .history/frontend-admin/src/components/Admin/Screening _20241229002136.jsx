import React, { useState } from "react";
import SideBar from "./SideBar";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";
import ShowtimeForm from "./ShowtimeForm";

// Hàm viết hoa chữ cái đầu
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Hàm tính danh sách các ngày trong tuần
const getWeekDays = () => {
  const days = [];
  for (let i = 0; i < 14; i++) {
    // Hiển thị 2 tuần
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
  const [selectedDate, setSelectedDate] = useState(getWeekDays()[0].fullDate); // Ngày được chọn
  const [startIndex, setStartIndex] = useState(0); // Bắt đầu từ ngày nào
  const [isFormVisible, setIsFormVisible] = useState(false); // Quản lý hiển thị form

  const daysToShow = 7; // Số ngày hiển thị

  // Dữ liệu mẫu
  const sampleData = {
    theaters: [
      {
        name: "Galaxy Tân Bình",
        rooms: [
          {
            name: "Rạp 1",
            showtimes: {
              "2024-12-29": [
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
                { timeRange: "21:00", movie: null },
              ],
            },
          },
          {
            name: "Rạp 2",
            showtimes: {
              "2024-12-29": [
                {
                  timeRange: "9:00-12:00",
                  movie: {
                    title: "Phim D",
                    duration: 90,
                    status: "Phim đã chiếu",
                    poster: "url-to-poster-A.jpg",
                  },
                },
                {
                  timeRange: "13:00-16:00",
                  movie: {
                    title: "Phim E",
                    duration: 100,
                    status: "Phim đang chiếu",
                    poster: "url-to-poster-B.jpg",
                  },
                },
                { timeRange: "17:00-20:00", movie: null },
                {
                  timeRange: "21:00",
                  movie: {
                    title: "Phim F",
                    duration: 80,
                    status: "Đã có phim chiếu",
                    poster: "url-to-poster-C.jpg",
                  },
                },
              ],
            },
          },
          {
            name: "Rạp 3",
            showtimes: {
              "2024-12-29": [
                {
                  timeRange: "9:00-12:00",
                  movie: {
                    title: "Phim D",
                    duration: 90,
                    status: "Phim đã chiếu",
                    poster: "url-to-poster-A.jpg",
                  },
                },
                {
                  timeRange: "13:00-16:00",
                  movie: {
                    title: "Phim E",
                    duration: 100,
                    status: "Phim đang chiếu",
                    poster: "url-to-poster-B.jpg",
                  },
                },
                { timeRange: "17:00-20:00", movie: null },
                {
                  timeRange: "21:00",
                  movie: null,
                },
              ],
            },
          },
        ],
      },
    ],
  };

  const weekDays = getWeekDays();

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNext = () => {
    if (startIndex + daysToShow < weekDays.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleAddShowtimeClick = () => {
    setIsFormVisible(true); // Hiển thị form
  };

  const handleCloseForm = () => {
    setIsFormVisible(false); // Đóng form
  };



  return (
    <div className="container">
      <SideBar />
      {isFormVisible && (
        <ShowtimeForm onClose={() => setIsFormVisible(false)} />
      )}
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
                <div className="content">
                  {/* Showtime Selector */}
                  <ShowtimeSelector
                    weekDays={weekDays}
                    startIndex={startIndex}
                    daysToShow={daysToShow}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                  />
                  <div className="line"></div>

                  <div className="screen">
                    <div className="room">
                      {theater.rooms.map((room) => (
                        <div
                          key={room.name}
                          className="room-number"
                          onClick={() => handleSelectRoom(room)}
                        >
                          <h3>{room.name}</h3>
                          <p>
                            Số suất chiếu:{" "}
                            {room.showtimes[selectedDate]
                              ? room.showtimes[selectedDate].filter(
                                  (showtime) => showtime.movie !== null
                                ).length
                              : 0}
                            /4
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Hiển thị suất chiếu */}
                    {selectedRoom && selectedRoom.showtimes[selectedDate] && (
                      <div className="showtimes">
                        {selectedRoom.showtimes[selectedDate].map(
                          (showtime, index) => (
                            <div key={index} className="box-showtime">
                              <h4>
                                Suất chiếu {index + 1} ({showtime.timeRange})
                              </h4>
                              {showtime.movie ? (
                                <>
                                  <h5>{showtime.movie.status}</h5>
                                  <div className="line"></div>
                                  <div className="poster">
                                    <img
                                      src={showtime.movie.poster}
                                      alt="Poster"
                                    />
                                  </div>
                                  <p>
                                    Tên phim:{" "}
                                    <span>{showtime.movie.title}</span>
                                  </p>
                                  <p>
                                    Thời gian:{" "}
                                    <span>{showtime.movie.duration} phút</span>
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
                                  <a
                                    href="#"
                                    className="btn-room"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleAddShowtimeClick();
                                    }}
                                  >
                                    Thêm lịch chiếu
                                  </a>
                                </>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
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
