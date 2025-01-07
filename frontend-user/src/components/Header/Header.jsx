import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Header.css";
import logo from "../img/Phim.png";
import Dropdown from "./Dropdown";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
// import { Link } from "react-router";
import jwtDecode from "jwt-decode";

function Header() {
  const options = ["HCM", "Hà-Nội", "Đà-Nẵng"];
  const events = [" Ưu Đãi", "Phim Hay Tháng"];
  const movies = ["Phim đang chiếu", "Phim sắp chiếu"];

  const handleSelect = (selected) => {
    console.log("Selected option:", selected);
  };

  const [modalType, setModalType] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

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
    setLoggedInUser(null);
    navigate("/");
  };

  const getDisplayName = () => {
    if (!loggedInUser || !loggedInUser.fullName) return ""; // Không có user
    const parts = loggedInUser.fullName.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : parts[0]; // Lấy từ cuối hoặc nguyên tên
  };

  return (
    <div className="flex justify-around w-[100%] items-center h-fit border-b-8 border-gray-200 pb-2 pt-2">
      <Link to={"/"} className="w-fit h-20">
        <img className="w-28 h-[100%]" src={logo} />
      </Link>

      <div className=" flex justify-between gap-4 items-center h-fit text-gray-600 ">
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

        <a className="hover:text-orange-500" href="/Blog-movies">
          Blog Mê phim
        </a>
      </div>
      <div className="flex relative h-fit border-none">
        <div className="absolute"><svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
        </div>
        <input className="pl-6 border border-none" placeholder="Tìm kiếm ..." />
      </div>

      <div className="">
        {loggedInUser ? (
          <div className="flex gap-3 justify-center items-center ">
            <Link to="/Profile">Hello, {getDisplayName()}</Link>
            <button onClick={handleLogout} className="">
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
