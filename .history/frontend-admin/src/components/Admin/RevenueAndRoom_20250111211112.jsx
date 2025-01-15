import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import './RevenueAndRoom.css';
import { IoTicketOutline } from 'react-icons/io5';
import { LuGlassWater } from 'react-icons/lu';
import { LuPopcorn } from 'react-icons/lu';
import ShowtimeSelector from './ShowtimeSelector';
import moment from 'moment';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getWeekDays = () => {
  const days = [];
  for (let i = 0; i < 14; i++) {
    const date = moment().add(i, 'days');
    days.push({
      day: capitalizeFirstLetter(date.format('dddd')),
      date: date.format('DD/MM'),
      fullDate: date.format('YYYY-MM-DD'),
    });
  }
  return days;
};

function RevenueAndRoom() {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(getWeekDays()[0].fullDate);
  const [cinemaData, setCinemaData] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showtimesData, setShowtimesData] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState({
    totalSeatPrice: 0,
    totalFoodPrice: 0,
    totalTicketsSold: 0,
    totalFoodItemsSold: 0,
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

// Tính tổng doanh thu và số vé bán, sản phẩm bán kèm từ bookingData
const calculateTotalRevenue = (data) => {
  return data.reduce(
    (total, item) => {
      const seatPrice = item.totalSeatPrice || 0;
      const foodPrice = item.totalFoodPrice || 0;

      // Tính số vé bán
      total.totalTicketsSold += item.seat.length || 0;

      // Tính số sản phẩm bán kèm
      total.totalFoodItemsSold += item.foodNames.reduce(
        (acc, food) => acc + (food.quantity || 0),
        0
      );

      total.totalSeatPrice += seatPrice;
      total.totalFoodPrice += foodPrice;
      return total;
    },
    {
     
      totalTicketsSold: 0,
      totalFoodItemsSold: 0,
    }
  );
};

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/cinemas')
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
        console.error('Error fetching cinema data:', error);
      });
  }, []);

  // Fetch showtimes data when cinema changes
  useEffect(() => {
    if (selectedCinema) {
      axios
        .get(`http://localhost:5000/api/showtimes/cinema/${selectedCinema}`)
        .then((response) => {
          setShowtimesData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching showtimes data:', error);
        });
    }
  }, [selectedCinema]);

  // Fetch booking data for each showtime
  useEffect(() => {
    if (showtimesData.length > 0) {
      // Lấy thông tin booking cho từng showtime
      const fetchBookingData = async () => {
        try {
          const bookings = await Promise.all(
            showtimesData.map((showtime) =>
              axios.get(`http://localhost:5000/api/booking/showtime/${showtime._id}`)
            )
          );
          const allBookings = bookings.map((booking) => booking.data);
          setBookingData(allBookings.flat());

          // Tính tổng doanh thu từ bookingData
          const revenue = calculateTotalRevenue(allBookings.flat());
          setTotalRevenue(revenue);
        } catch (error) {
          console.error('Error fetching booking data:', error);
        }
      };
      fetchBookingData();
    }
  }, [showtimesData]);

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  const currentCinema = cinemaData.find(
    (cinema) => cinema.id === selectedCinema
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
              value={selectedCinema || ''}
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
                      const roomShowtimes = showtimesData.filter(
                        (showtime) => showtime.room === room.id
                      );
                      return roomShowtimes.length > 0 ? (
                        roomShowtimes.map((showtime) => (
                          <tr key={showtime._id}>
                            <td>{showtime.times}</td>
                            <td>{showtime.movie.title}</td>
                            <td>{showtime.times}</td>
                            <td>{totalRevenue.totalTicketsSold}</td>
                            <td>{totalRevenue.totalFoodItemsSold}</td>
                            <td>
                              {totalRevenue.totalSeatPrice +
                                totalRevenue.totalFoodPrice}{' '}
                              đ
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key={`empty-${room.id}`}>
                          <td colSpan="6" style={{ textAlign: 'center' }}>
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
                  <h3>Tổng:</h3>
                  <div className="sumPrice">
                    <p>
                      {totalRevenue.totalSeatPrice +
                        totalRevenue.totalFoodPrice}{' '}
                      đ
                    </p>
                  </div>
                </div>
                <div className="line"></div>
                <div className="total">
                  <h3>
                    Tổng doanh thu: {totalRevenue.totalSeatPrice +
                      totalRevenue.totalFoodPrice}{' '}
                    đ
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
