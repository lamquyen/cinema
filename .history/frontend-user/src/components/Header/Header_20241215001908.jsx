import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../img/Phim.png";
import Dropdown from "./Dropdown";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import { Link } from "react-router";
import jwtDecode from "jwt-decode";

function Header() {
  const options = [" HCM", "Hà Nội", "Đà Nẵng"];
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
      setLoggedInUser(userData);

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

  const getDisplayName = () => {
    if (!loggedInUser || !loggedInUser.fullName) return ""; // Không có user
    const parts = loggedInUser.fullName.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : parts[0]; // Lấy từ cuối hoặc nguyên tên
  };

  return (
    <div className="flex justify-around w-[100%] items-center h-20 ">
      <Link to={"/"} className="w-fit h-20">
        <img className="w-28 h-[100%]" src={logo} />
      </Link>

      <div className=" flex justify-between gap-8 items-center h-fit text-gray-600 ">
        <div className="self-center text-center h-fit">
          <Dropdown
            options={options}
            placeholder="Rạp Chiếu"
            onSelect={handleSelect}
            herf="rap-phim"
          />
        </div>
        <div>
          <Dropdown
            options={events}
            placeholder="Sự Kiện"
            onSelect={handleSelect}
          />
        </div>
        <div>
          <Dropdown
            options={movies}
            placeholder="Phim"
            onSelect={handleSelect}
          />
        </div>
        <p className="hover:text-orange-500">
          <Link to={"/"}>Mua vé</Link>
        </p>

        <a className="hover:text-orange-500" href="#">
          Blog Mê Phim
        </a>
        <div>
          <input className="border-1-red" placeholder="Tìm kiếm ..." />
        </div>
      </div>

      <div className="ticket">
        {loggedInUser ? (
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <Link
              to="/Profile"
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Hello, {getDisplayName()}
            </Link>
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
  );
}

export default Header;

