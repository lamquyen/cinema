import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";
import ShowtimeForm from "./ShowtimeForm";
import axios from "axios";

const Screening = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [cinemaData, setCinemaData] = useState([]);

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

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    console.log("Selected Room: ", room); // Log room data when a room is selected

    // Fetch showtimes for the selected room and selected date
    const showtimesForRoom = room.showtimes[selectedDate] || [];
    console.log("Showtimes for Selected Room and Date: ", showtimesForRoom); // Log the showtimes for selected room and date
  };

  // Log cinema data
  useEffect(() => {
    console.log("Cinema Data: ", cinemaData); // Log cinema data
  }, [cinemaData]);

  return (
    <div className="container">
      <SideBar />
      <div className="main">
        <h2 className="subtitle">Screening Management</h2>
        {cinemaData.map((theater, theaterIndex) => (
          <div key={theater.name} className="dropdown-container">
            <div
              className="dropdown-title"
              onClick={() => setOpenDropdownIndex((prev) => (prev === theaterIndex ? null : theaterIndex))}
            >
              {theater.name}
            </div>
            {openDropdownIndex === theaterIndex && (
              <div className="dropdown-menu">
                <div className="content">
                  <ShowtimeSelector
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                  <div className="screen">
                    <div className="room">
                      {theater.rooms.map((room, index) => (
                        <div
                          key={room.id}
                          className="room-number"
                          onClick={() => handleSelectRoom(room)}
                        >
                          <h3>Rạp {index + 1}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screening;