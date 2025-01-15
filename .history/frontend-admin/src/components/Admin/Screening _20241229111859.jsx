import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";
import ShowtimeForm from "./ShowtimeForm";
import axios from "axios";

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
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getWeekDays()[0].fullDate);
  const [startIndex, setStartIndex] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cinemaData, setCinemaData] = useState([]);
  const [filteredShowtimes, setFilteredShowtimes] = useState([]); // State mới để lưu suất chiếu đã lọc

  const daysToShow = 7;
  const weekDays = getWeekDays();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cinemas")
      .then((response) => {
        const transformedData = response.data.map((cinema) => ({
          id: cinema._id,
          name: cinema.cinemaName,
          rooms: cinema.room.map((roomId) => ({
            id: roomId,
            showtimes: {},
          })),
        }));
        setCinemaData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching cinema data:", error);
      });
  }, []);

  const fetchShowtimesForCinema = async (cinemaId, cinemaRooms) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/showtimes/cinema/${cinemaId}`
      );
      const allShowtimes = response.data;

      // Log tất cả suất chiếu để kiểm tra dữ liệu
      console.log("All Showtimes: ", allShowtimes);

      // Lọc các showtimes có room trùng với room của cinema
      const filteredShowtimes = allShowtimes.filter((showtime) =>
        cinemaRooms.includes(showtime.room)
      );

      // Log showtimes sau khi lọc theo room
      console.log("Filtered Showtimes: ", filteredShowtimes);

      // Lọc showtimes theo ngày đã chọn, sử dụng `isSame` để so sánh chính xác ngày
      const filteredShowtimesForSelectedDate = filteredShowtimes.filter(
        (showtime) => {
          return showtime.days.some((day) => {
            // Chuyển đổi ngày thành định dạng chuẩn và so sánh với selectedDate
            const showtimeDay = moment(day).format("YYYY-MM-DD");
            console.log(
              "Comparing showtimeDay: ",
              showtimeDay,
              "with selectedDate: ",
              selectedDate
            );
            return moment(showtimeDay).isSame(selectedDate, "day"); // So sánh chính xác ngày
          });
        }
      );

      // Kiểm tra lại filtered showtimes cho ngày đã chọn
      console.log(
        "Filtered Showtimes for selected date: ",
        filteredShowtimesForSelectedDate
      );

      return filteredShowtimesForSelectedDate;
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      return [];
    }
  };

  // Hàm xử lý khi chọn phòng và lấy dữ liệu suất chiếu
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    const selectedCinema = cinemaData.find((cinema) =>
      cinema.rooms.some((cinemaRoom) => cinemaRoom.id === room.id)
    );

    if (selectedCinema) {
      const cinemaId = selectedCinema.id;

      fetchShowtimesForCinema(cinemaId, [room.id]).then((showtimes) => {
        // Lọc showtimes theo ngày đã chọn (chỉ so sánh phần ngày)
        const filteredShowtimesForSelectedDate = showtimes.filter(
          (showtime) => {
            return showtime.days.some((day) => {
              const showtimeDay = moment(day).format("YYYY-MM-DD");
              return moment(showtimeDay).isSame(selectedDate, "day"); // So sánh theo ngày
            });
          }
        );

        // Cập nhật state filteredShowtimes với dữ liệu đã lọc
        setFilteredShowtimes(filteredShowtimesForSelectedDate);
        console.log("Selected Date: ", selectedDate);
        console.log("Filtered Showtimes: ", filteredShowtimesForSelectedDate);
      });
    }
  };

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

  const handleAddShowtimeClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="container">
      <SideBar />
      {isFormVisible && (
        <ShowtimeForm onClose={() => setIsFormVisible(false)} />
      )}
      <div className="main">
        <h2 className="subtitle">Screening Management</h2>
        {cinemaData.map((theater, theaterIndex) => (
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
                      {theater.rooms.map((room, index) => {
                        return (
                          <div
                            key={room.id}
                            className="room-number"
                            onClick={() => handleSelectRoom(room)}
                          >
                            <h3>Rạp {index + 1}</h3>
                            <p>
                              Số suất chiếu:{" "}
                              {room.showtimes[selectedDate]
                                ? room.showtimes[selectedDate].length
                                : 0}
                              /4
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Hiển thị suất chiếu */}
                    {filteredShowtimes.length > 0 ? (
                      <div className="showtimes">
                        {Array.from({ length: 4 }).map((_, index) => {
                          const showtime = filteredShowtimes[index]; // Lấy suất chiếu tương ứng (nếu có)
                          if (showtime) {
                            // Nếu suất chiếu có dữ liệu
                            return (
                              <div key={index} className="box-showtime">
                                <h4>
                                  Suất chiếu {index + 1} ({showtime.times})
                                </h4>
                                {showtime.movie ? (
                                  <>
                                    <h5>Phim đang chiếu</h5>
                                    <div className="line"></div>
                                    <div className="poster">
                                      <img
                                        src={showtime.movie.img}
                                        alt={showtime.movie.title}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                        }}
                                      />
                                    </div>
                                    <p>
                                      Tên phim:{" "}
                                      <span>{showtime.movie.title}</span>
                                    </p>
                                    <p>
                                      Thời gian: <span>{showtime.times}</span>
                                    </p>
                                    <a href="#" className="btn-room">
                                      {showtime.movie.isReleased
                                        ? "Xem doanh thu"
                                        : "Thay đổi lịch chiếu"}
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
                            );
                          } else {
                            // Nếu không có suất chiếu cho box này
                            return (
                              <div key={index} className="box-showtime">
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
                              </div>
                            );
                          }
                        })}
                      </div>
                    ) : null}
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
