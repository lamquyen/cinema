import React, { useState, useEffect } from "react";
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
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check localStorage for logged-in user on component mount
    try {
      const userData = localStorage.getItem("loggedInUser");
      setLoggedInUser(userData ? JSON.parse(userData) : null); // Chỉ cần parse đối tượng, không phải email
    } catch (error) {
      console.error("Error parsing loggedInUser from localStorage:", error);
    }
  }, []);

  const handleLoginClick = () => {
    setModalType("login");
  };

  const handleRegisterClick = () => {
    setModalType("register");
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleLoginSuccess = (userData) => {
    // Save user data to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    // Delay updating the state until after the modal closes
    setTimeout(() => {
      setLoggedInUser(userData); // Update the state to display the 'Hello, email' after modal closes

      // Close the modal after 3 seconds
      setTimeout(() => {
        setModalType(null);
      }, 3000);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    // Update state to log out the user
    setLoggedInUser(null);
    // Optional: Redirect to the homepage or reload the page
    window.location.reload(); // Reload to reset the UI
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
          {loggedInUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>Hello, {loggedInUser.email}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLoginClick}>Đăng nhập</button>
          )}
          {modalType === "login" && (
            <Login
              isOpen={modalType === "login"}
              onClose={handleCloseModal}
              onRegisterClick={handleRegisterClick}
              onLoginSuccess={handleLoginSuccess} // Pass success handler
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
