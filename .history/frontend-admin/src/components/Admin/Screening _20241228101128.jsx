import React, { useState } from 'react';
import SideBar from "./SideBar";

function Screening() {
  const [isOpen, setIsOpen] = useState(false);

    // Hàm xử lý khi nhấn vào tiêu đề
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div className="container">
      <SideBar />
      <div className="main">
        <div className="movie-title">
          <h2 className="subtitle">Screening management</h2>
        </div>
        <div className="dropdown-container">
      <div className="dropdown-title" onClick={toggleDropdown}>
        Galaxy Tân Bình
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#option1">Tùy chọn 1</a>
          <a href="#option2">Tùy chọn 2</a>
          <a href="#option3">Tùy chọn 3</a>
        </div>
      )}
    </div>
        

      </div>
    </div>
  );
}

export default Screening;
