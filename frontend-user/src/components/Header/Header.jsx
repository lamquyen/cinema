import React, { useState } from "react";
import "./Header.css";
import logo from "../img/Phim.png";
import Dropdown from "./Dropdown";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";

function Header() {
  const options = [" HCM", "Hà Nội", "Bình Dương"];
  const events = [" Ưu Đãi", "Phim Hay Tháng"];
  const movies = ["Phim đang chiếu", "Phim sắp chiếu"];

  const handleSelect = (selected) => {
    console.log("Selected option:", selected);
  };

  const [modalType, setModalType] = useState(null);

  const handleLoginClick = () => {
    setModalType("login");
  };

  const handleRegisterClick = () => {
    setModalType("register");
  };

  const handleCloseModal = () => {
    setModalType(null);
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
          <a href="#">Mua vé</a>
          <a href="#">Blog Mê Phim</a>
          <input className="search" placeholder="Tìm kiếm ..." />
        </div>

        <div className="ticket">
          <button onClick={handleLoginClick}>Đăng nhập</button>
          {modalType === "login" && (
            <Login
              isOpen={modalType === "login"}
              onClose={handleCloseModal}
              onRegisterClick={handleRegisterClick}
            />
          )}
          {modalType === "register" && (
            <Register
              isOpen={modalType === "register"}
              onClose={handleCloseModal}
              onLoginClick={handleLoginClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
