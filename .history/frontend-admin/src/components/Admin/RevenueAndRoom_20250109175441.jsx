import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import './RevenueAndRoom.css';
import { IoTicketOutline } from "react-icons/io5";
import { LuGlassWater, LuPopcorn } from "react-icons/lu";

function RevenueAndRoom() {
  const [cinemaData, setCinemaData] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

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

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  const currentCinema = cinemaData.find((cinema) => cinema.id === selectedCinema);

  return (
    <div className='container'>
      <SideBar />
      <div className='main'>
        <h2 className="subtitle">Revenue and screening room management</h2>
        <div className='box-container'>
          {/* Dropdown */}
          <div className="dropdown-container">
            <select className="dropdown" value={selectedCinema || ""} onChange={handleCinemaChange}>
              {cinemaData.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.name}
                </option>
              ))}
            </select>
          </div>

          {/* Room and Revenue Content */}
          <div className="content">
            <div className="screen hig">
              <div className="room">
                {currentCinema?.rooms.map((room) => (
                  <div key={room.id} className="room-number">
                    <h3>Rạp {room.id}</h3>
                  </div>
                ))}
              </div>

              {/* Static Revenue Content (Replace or Expand Later) */}
              <div className="revenue">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Suất Chiếu</th>
                      <th>Tên Phim</th>
                      <th>Ngày</th>
                      <th>Giờ Chiếu</th>
                      <th>Vé Bán</th>
                      <th>SP Bán Kèm</th>
                      <th>Doanh Thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Add logic to map showtimes here if available */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevenueAndRoom;

