import React, { useState } from "react";
import SideBar from "./SideBar";

function Screening() {
  // Lưu trạng thái mở/đóng của từng dropdown
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Hàm xử lý khi nhấn vào dropdown
  const toggleDropdown = (index) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Đảo ngược trạng thái của dropdown được nhấn
    }));
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
          <div
            className="dropdown-title"
            onClick={() => toggleDropdown(1)} // Xác định dropdown bằng index
          >
            Galaxy Tân Bình
          </div>
          {openDropdowns[1] && (
            <div className="dropdown-menu">
              <div className="content">Tùy chọn 1</div>
            </div>
          )}
        </div>

        {/* Dropdown 2 */}
        <div className="dropdown-container">
          <div
            className="dropdown-title"
            onClick={() => toggleDropdown(2)} // Xác định dropdown bằng index
          >
            Galaxy Nguyễn Trãi
          </div>
          {openDropdowns[2] && (
            <div className="dropdown-menu">
              <div className="content">Tùy chọn 2</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Screening;