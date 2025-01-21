import React, { useState } from "react";
import SideBar from "./SideBar";

function Screening() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Quản lý trạng thái mở của từng dropdown

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index)); // Đóng nếu cùng index, mở nếu khác
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
            onClick={() => toggleDropdown(1)}
          >
            Galaxy Tân Bình
          </div>
          {openDropdownIndex === 1 && (
            <div className="dropdown-menu">
              <div className="content">Tùy chọn 1</div>
              <div className="content">Tùy chọn 2</div>
            </div>
          )}
        </div>

        {/* Dropdown 2 */}
        <div className="dropdown-container">
          <div
            className="dropdown-title"
            onClick={() => toggleDropdown(2)}
          >
            Galaxy Nguyễn Trãi
          </div>
          {openDropdownIndex === 2 && (
            <div className="dropdown-menu">
              <div className="content">Tùy chọn 1</div>
              <div className="content">Tùy chọn 2</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Screening;