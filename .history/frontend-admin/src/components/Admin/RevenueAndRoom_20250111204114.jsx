import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import "./RevenueAndRoom.css";
import { IoTicketOutline } from "react-icons/io5";
import { LuGlassWater } from "react-icons/lu";
import { LuPopcorn } from "react-icons/lu";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

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

const calculateTotalRevenue = (data) => {
  return data.reduce(
    (total, item) => {
      total.totalSeatPrice += item.totalSeatPrice;
      total.totalFoodPrice += item.totalFoodPrice;
      return total;
    },
    { totalSeatPrice: 0, totalFoodPrice: 0 }
  );
};

function RevenueAndRoom() {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(getWeekDays()[0].fullDate);
  const [cinemaData, setCinemaData] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showtimesData, setShowtimesData] = useState([]);
  const [bookingData, setBookingData] = useState({});

  const daysToShow = 7;
  const weekDays = getWeekDays();

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
        if (transformedData.length > 0) {
          setSelectedCinema(transformedData[0].id); // Chọn cinema đầu tiên mặc định
        }
      })
      .catch((error) => {
        console.error("Error fetching cinema data:", error);
      });
  }, []);

  // Fetch showtimes data when cinema changes
  useEffect(() => {
    if (selectedCinema) {
      axios
        .get(`http://localhost:5000/api/showtimes/cinema/${selectedCinema}`)
        .then((response) => {
          setShowtimesData(response.data); // Cập nhật dữ liệu suất chiếu
        })
        .catch((error) => {
          console.error("Error fetching showtimes data:", error);
        });
    }
  }, [selectedCinema]);

  // Fetch booking data when a showtime is selected
  useEffect(() => {
    if (showtimesData.length > 0) {
      showtimesData.forEach((showtime) => {
        axios
          .get(`http://localhost:5000/api/booking/showtime/${showtime._id}`)
          .then((response) => {
            setBookingData((prevBookingData) => ({
              ...prevBookingData,
              [showtime._id]: response.data,
            }));
          })
          .catch((error) => {
            console.error(`Error fetching booking data for showtime ${showtime._id}:`, error);
          });
      });
    }
  }, [showtimesData]);

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  const currentCinema = cinemaData.find(
    (cinema) => cinema.id === selectedCinema
  );

  // Tính tổng doanh thu từ dữ liệu showtimes và bookingData
  const totalRevenue = calculateTotalRevenue(showtimesData.map((showtime) => {
    const booking = bookingData[showtime._id] || {}; // Nếu không có dữ liệu booking thì set {} để tránh lỗi
    return {
      totalSeatPrice: booking.totalSeatPrice || showtime.totalSeatPrice || 0,
      totalFoodPrice: booking.totalFoodPrice || showtime.totalFoodPrice || 0,
    };
  }));

  return (
    <div className="container">
      <SideBar />
      <div className="main">
        <h2 className="subtitle">Revenue and screening room management</h2>
        <div className="box-container">
          <div className="dropdown-title">
            <select
              className="dropdown"
              value={selectedCinema || ""}
              onChange={handleCinemaChange}
            >
              {cinemaData.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.name}
                </option>
              ))}
            </select>
          </div>

          <div className="content fix-h">
            <div className="buttonChooseDay"></div>
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
            <div className="screen hig">
              <div className="room w">
                {currentCinema?.rooms.map((room, index) => (
                  <div key={room.id} className="room-number">
                    <h3>Rạp {index + 1}</h3>
                  </div>
                ))}
              </div>
              <div className="revenue">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Suất Chiếu</th>
                      <th>Tên Phim</th>
                      <th>Giờ Chiếu</th>
                      <th>Vé Bán</th>
                      <th>SP Bán Kèm</th>
                      <th>Doanh Thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCinema?.rooms.map((room) => {
                      // Lọc các suất chiếu theo phòng
                      const roomShowtimes = showtimesData.filter(
                        (showtime) => showtime.room === room.id
                      );

                      return roomShowtimes.length > 0 ? (
                        roomShowtimes.map((showtime) => {
                          const booking = bookingData[showtime._id] || {};
                          return (
                            <tr key={showtime._id}>
                              <td>{showtime.times}</td>
                              <td>{showtime.movie.title}</td>
                              <td>{showtime.times}</td>
                              <td>{booking.totalSeatPrice || 0} đ</td>
                              <td>{booking.totalFoodPrice || 0} đ</td>
                              <td>
                                {(booking.totalSeatPrice || 0) +
                                  (booking.totalFoodPrice || 0)}{" "}
                                đ
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={`empty-${room.id}`}>
                          <td colSpan="6" style={{ textAlign: "center" }}>
                            Không có dữ liệu suất chiếu cho Rạp {room.id}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="total-revenue-room">
                <div className="room-title">
                  <h1>
                    Tổng doanh thu rạp <span> 1 </span>
                  </h1>
                </div>
                <div className="revenue-content">
                  <h3>Ngày: 2025-01-05</h3>
                  <h3>Loại Rạp: Basic</h3>
                  <span>Vé Bán:</span>{" "}
                  <span>
                    <IoTicketOutline style={{ color: "green" }} />: 60
                  </span>{" "}
                  <span>
                    <IoTicketOutline style={{ color: "red" }} />: 30
                  </span>{" "}
                  <span>
                    <IoTicketOutline style={{ color: "purple" }} />: 10
                  </span>
                  <h3>Tổng:</h3>
                  <div className="sumPrice">
                    <p>
                      {totalRevenue.totalSeatPrice + totalRevenue.totalFoodPrice} đ
                    </p>
                  </div>
                  <span>SP bán kèm:</span>{" "}
                  <span>
                    <LuGlassWater />: 5
                  </span>{" "}
                  <span>
                    <LuPopcorn />: 7
                  </span>{" "}
                  <span>Cb: 8</span>
                  <h3>Tổng:</h3>
                  <div className="sumPrice">
                    <p>{totalRevenue.totalFoodPrice} đ</p>
                  </div>
                </div>
                <div className="line"></div>
                <div className="total">
                  <h3>
                    Tổng Doanh Thu:{" "}
                    {totalRevenue.totalSeatPrice + totalRevenue.totalFoodPrice} đ
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueAndRoom;