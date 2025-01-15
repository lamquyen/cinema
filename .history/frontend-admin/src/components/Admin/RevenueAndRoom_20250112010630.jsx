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

function RevenueAndRoom() {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(getWeekDays()[0].fullDate);
  const [cinemaData, setCinemaData] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showtimesData, setShowtimesData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState({
    totalSeatPrice: 0,
    totalFoodPrice: 0,
    totalSeat: 0,
    totalSeatN: 0,
    totalSeatV: 0,
    totalSeatC: 0,
    totalCombo: 0,
    totalCorn: 0,
    totalPepsi: 0,
  });

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

  const countSeats = (seats) => {
    let seatN = 0;
    let seatV = 0;
    let seatC = 0;

    seats.forEach((seat) => {
      if (seat.typeSeat === "normal") {
        seatN += 1;
      } else if (seat.typeSeat === "vip") {
        seatV += 1;
      } else {
        seatC += 1;
      }
    });

    return { seatN, seatV, seatC };
  };

  const countfoodNames = (foodNames) => {
    let corn = 0;
    let pepsi = 0;
    let combo = 0;

    foodNames.forEach((foodName) => {
      if (foodName.name === "Corn") {
        corn += 1;
      } else if (foodName.name === "PepSi 32Oz") {
        pepsi += 1;
      } else {
        combo += 1;
      }
    });

    return { corn, pepsi, combo };
  };

  const calculateTotalRevenue = (data) => {
    return data.reduce(
      (total, item) => {
        const seatPrice = item.totalSeatPrice || 0;
        const foodPrice = item.totalFoodPrice || 0;
        const seat = item.seat || [];
        const foodNames = item.foodNames || [];

        const { seatN, seatV, seatC } = countSeats(seat);
        const { corn, pepsi, combo } = countfoodNames(foodNames);

        total.totalSeatPrice += seatPrice;
        total.totalFoodPrice += foodPrice;
        total.totalSeat += seat;
        total.totalSeatN += seatN;
        total.totalSeatV += seatV;
        total.totalSeatC += seatC;
        total.totalCombo += combo;
        total.totalCorn += corn;
        total.totalPepsi += pepsi;

        return total;
      },
      {
        totalSeatPrice: 0,
        totalFoodPrice: 0,
        totalSeat: 0,
        totalSeatN: 0,
        totalSeatV: 0,
        totalSeatC: 0,
        totalCombo: 0,
        totalCorn: 0,
        totalPepsi: 0,
      }
    );
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
          setSelectedCinema(transformedData[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching cinema data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCinema) {
      axios
        .get(`http://localhost:5000/api/showtimes/cinema/${selectedCinema}`)
        .then((response) => {
          setShowtimesData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching showtimes data:", error);
        });
    }
  }, [selectedCinema]);

  useEffect(() => {
    if (showtimesData.length > 0) {
      const fetchBookingData = async () => {
        try {
          const bookings = await Promise.all(
            showtimesData.map((showtime) =>
              axios.get(`http://localhost:5000/api/booking/showtime/${showtime._id}`)
            )
          );
          const allBookings = bookings.map((booking) => booking.data);
          setBookingData(allBookings.flat());

          const revenue = calculateTotalRevenue(allBookings.flat());
          setTotalRevenue(revenue);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      };
      fetchBookingData();
    }
  }, [showtimesData]);

  useEffect(() => {
    if (selectedRoomId) {
      const roomShowtimes = showtimesData.filter(
        (showtime) => showtime.room === selectedRoomId
      );

      const roomBookings = bookingData.filter((booking) =>
        roomShowtimes.some((showtime) => showtime._id === booking.showtimeId)
      );

      const roomRevenue = calculateTotalRevenue(roomBookings);
      setTotalRevenue(roomRevenue);
    }
  }, [selectedRoomId, showtimesData, bookingData]);

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  const handleRoomClick = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const currentCinema = cinemaData.find(
    (cinema) => cinema.id === selectedCinema
  );

  const selectedRoomShowtimes = showtimesData.filter(
    (showtime) => showtime.room === selectedRoomId
  );

  const selectedDateShowtimes = selectedRoomShowtimes.filter(
    (showtime) => moment(showtime.date).format("YYYY-MM-DD") === selectedDate
  );

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
                  <div
                    key={room.id}
                    className={`room-number ${
                      selectedRoomId === room.id ? "selected-room" : ""
                    }`}
                    onClick={() => handleRoomClick(room.id)}
                  >
                    <h3>Rạp {index + 1}</h3>
                  </div>
                ))}
              </div>

              <div className="revenue">
                {selectedRoomId ? (
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
                      {selectedDateShowtimes.length > 0 ? (
                        selectedDateShowtimes.map((showtime) => {
                          return (
                            <tr key={showtime._id}>
                              <td>{showtime.times}</td>
                              <td>{showtime.movie.title}</td>
                              <td>{showtime.times}</td>
                              <td>3</td>
                              <td>6</td>
                              <td>5.000.000 đ</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center" }}>
                            Không có suất chiếu trong ngày này
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ textAlign: "center" }}>
                    Vui lòng chọn một phòng để hiển thị thông tin
                  </p>
                )}
              </div>

              <div className="total-revenue-room">
                <div className="room-title">
                  <h1>
                    Tổng doanh thu rạp{" "}
                    <span>
                      {currentCinema?.rooms.findIndex(
                        (room) => room.id === selectedRoomId
                      ) + 1}
                    </span>
                  </h1>
                </div>
                <div className="revenue-content">
                  <h3>Ngày: {selectedDate}</h3>
                  <h3>Loại Rạp: Basic</h3>
                  <span>Vé Bán:</span>{" "}
                  <span>
                    <IoTicketOutline style={{ color: "green" }} />:{" "}
                    {totalRevenue.totalSeatN}
                  </span>{" "}
                  <span>
                    <IoTicketOutline style={{ color: "red" }} />:{" "}
                    {totalRevenue.totalSeatV}
                  </span>{" "}
                  <span>
                    <IoTicketOutline style={{ color: "yellow" }} />:{" "}
                    {totalRevenue.totalSeatC}
                  </span>
                  <div className="revenue">
                    <p>
                      Doanh thu vé: {totalRevenue.totalSeatPrice} đ
                    </p>
                    <div className="revenue-item">
                      <LuPopcorn />{" "}
                      <span>
                        {totalRevenue.totalCorn}
                      </span>
                    </div>
                    <div className="revenue-item">
                      <LuGlassWater />{" "}
                      <span>
                        {totalRevenue.totalPepsi}
                      </span>
                    </div>
                    <div className="revenue-item">
                      <LuGlassWater />{" "}
                      <span>
                        {totalRevenue.totalCombo}
                      </span>
                    </div>
                    <p>
                      Doanh thu bán kèm:{" "}
                      {totalRevenue.totalFoodPrice} đ
                    </p>
                  </div>
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