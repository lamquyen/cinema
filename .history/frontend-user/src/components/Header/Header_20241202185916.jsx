import React from "react";
import "./Header.css";
import logo from "../img/Phim.png";
import Dropdown from "./Dropdown";

function Header() {
  const options = [" HCM", "Hà Nội", "Bình Dương"];
  const events = [" Ưu Đãi", "Phim Hay Tháng"];
  const movies = ["Phim đang chiếu", "Phim sắp chiếu"];

  const handleSelect = (selected) => {
    console.log("Selected option:", selected);
  };
  return (
    <div className="header">
      <div className="navbar">
        <div className="logo">
          <img src={logo} style={{ height: "100%", width: "100%" }} />
        </div>
     
      
          <div className="toolbar">
         
            <Dropdown
              options={options}
              placeholder=" Rạp Chiếu"
              onSelect={handleSelect}
            />
            <Dropdown
              options={events}
              placeholder="Sự Kiện"
              onSelect={handleSelect}
            />
            <Dropdown
              options={movies}
              placeholder="Phim"
              onSelect={handleSelect}
            />
            <input className="search" placeholder="Tìm kiếm ..." />
            <a href="#">Mua vé</a>
            <a href="#">Blog Mê Phim</a>
          </div>

        <div className="ticket">
          <p>Đăng nhập</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
