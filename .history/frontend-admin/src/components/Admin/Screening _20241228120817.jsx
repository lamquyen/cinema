import React, { useState } from "react";
import SideBar from "./SideBar";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";

// Hàm để viết hoa chữ cái đầu tiên
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
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Quản lý trạng thái mở của từng dropdown
  const [startIndex, setStartIndex] = useState(0); // Chỉ số bắt đầu của ngày trong tuần
  const [selectedDate, setSelectedDate] = useState(""); // Ngày được chọn
  const daysToShow = 7; // Số ngày hiển thị trong mỗi lần cuộn
  const weekDays = getWeekDays(); // Tính toán danh sách các ngày trong tuần

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index)); // Đóng nếu cùng index, mở nếu khác
  };

  // Xử lý chuyển đến ngày tiếp theo
  const handleNext = () => {
    if (startIndex + daysToShow < weekDays.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  // Xử lý quay về ngày trước đó
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="container">
      <SideBar />
      <div className="main">
        <div className="movie-title">
          <h2 className="subtitle">Screening management</h2>
        </div>

        {/* Dropdown 1 */}
        <div className="dropdown-container">
          <div className="dropdown-title" onClick={() => toggleDropdown(1)}>
            Galaxy Tân Bình
          </div>
          {openDropdownIndex === 1 && (
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
                <div className="showtimes"></div>
                <div className="room"></div>

                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dropdown 2 */}
        <div className="dropdown-container">
          <div className="dropdown-title" onClick={() => toggleDropdown(2)}>
            Galaxy Nguyễn Trãi
          </div>
          {openDropdownIndex === 2 && (
            <div className="dropdown-menu">
              <div className="content">Tùy chọn 1</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Screening;
