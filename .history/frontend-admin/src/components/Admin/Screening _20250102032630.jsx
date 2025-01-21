function Screening() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getWeekDays()[0].fullDate);
  const [startIndex, setStartIndex] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cinemaData, setCinemaData] = useState([]);
  const [roomFilteredShowtimes, setRoomFilteredShowtimes] = useState({});
  const [cinemaName, setCinemaName] = useState(""); // Khởi tạo state cho cinemaName
  const [cinemaId, setCinemaId] = useState(""); // Thêm state để lưu cinemaId
  const daysToShow = 7;
  const weekDays = getWeekDays();

  // Fetch cinema data
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

      const filteredShowtimes = allShowtimes.filter((showtime) =>
        cinemaRooms.includes(showtime.room)
      );

      const filteredShowtimesForSelectedDate = filteredShowtimes.filter(
        (showtime) => {
          return showtime.days.some((day) => {
            const showtimeDay = moment(day).format("YYYY-MM-DD");
            return moment(showtimeDay).isSame(selectedDate, "day");
          });
        }
      );

      return filteredShowtimesForSelectedDate;
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      return [];
    }
  };

  const handleSelectRoom = (room) => {
    if (!room || !room.id) return; // Kiểm tra room và room.id có hợp lệ hay không
  
    setSelectedRoom(room); // Cập nhật selectedRoom khi chọn phòng

    const selectedCinema = cinemaData.find((cinema) =>
      cinema.rooms.some((cinemaRoom) => cinemaRoom.id === room.id)
    );

    if (selectedCinema) {
      const cinemaId = selectedCinema.id;
      setCinemaName(selectedCinema.name); // Cập nhật cinemaName khi chọn rạp
      setCinemaId(cinemaId); // Lưu cinemaId vào state

      fetchShowtimesForCinema(cinemaId, [room.id]).then((showtimes) => {
        setRoomFilteredShowtimes((prev) => ({
          ...prev,
          [room.id]: showtimes,
        }));
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

  const handleAddShowtimeClick = (cinemaName, roomId, cinemaId) => {
    setSelectedRoom({ id: roomId }); // Lưu lại selectedRoom để sử dụng trong form
    setIsFormVisible(true); // Chỉ hiển thị form khi click vào "Thêm lịch chiếu"
    setCinemaName(cinemaName); // Cập nhật cinemaName
    setCinemaId(cinemaId); // Cập nhật cinemaId
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="container">
      <SideBar />
      {isFormVisible && (
        <ShowtimeForm
          onClose={handleCloseForm}
          cinemaName={cinemaName} // Truyền cinemaName từ state
          roomNumber={selectedRoom?.id} // Truyền room number từ selectedRoom
          selectedDate={selectedDate} // Truyền selectedDate từ state
          cinemaId={cinemaId} // Truyền cinemaId vào ShowtimeForm
        />
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
                      {theater.rooms.map((room, index) => (
                        <div
                          key={room.id}
                          className="room-number"
                          onClick={() => handleSelectRoom(room)} // Truyền room chính xác
                        >
                          <h3>Rạp {index + 1}</h3>
                          <p>
                            Số suất chiếu:{" "}
                            {roomFilteredShowtimes[room.id]?.length || 0} / 4
                          </p>
                        </div>
                      ))}
                    </div>

                    {selectedRoom && roomFilteredShowtimes[selectedRoom.id] && (
                      <div className="showtimes">
                        {[...Array(4)].map((_, index) => {
                          const showtime =
                            roomFilteredShowtimes[selectedRoom.id]?.[index];
                          return (
                            <div key={index} className="box-showtime">
                              {showtime ? (
                                <>
                                  <h4>Suất chiếu {index + 1}</h4>
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
                                        Suất Chiếu:{" "}
                                        <span>{showtime.times}</span>
                                      </p>
                                      <a href="#" className="btn-room">
                                        {showtime.movie.isReleased
                                          ? "Xem doanh thu"
                                          : "Thay đổi lịch chiếu"}
                                      </a>
                                    </>
                                  ) : (
                                    <div>
                                      <h5>Rạp trống</h5>
                                      <div className="line"></div>
                                      <a
                                        href="#"
                                        className="btn-room"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleAddShowtimeClick(
                                            theater.name,
                                            selectedRoom?.id,
                                            theater.id // Lưu cinemaId
                                          );
                                        }}
                                      >
                                        Thêm lịch chiếu
                                      </a>
                                    </div>
                                  )}
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
                                      handleAddShowtimeClick(
                                        theater.name,
                                        selectedRoom?.id,
                                        theater.id // Lưu cinemaId
                                      );
                                    }}
                                  >
                                    Thêm lịch chiếu
                                  </a>
                                </>
                              )}
                            </div>
                          );
                        })}
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