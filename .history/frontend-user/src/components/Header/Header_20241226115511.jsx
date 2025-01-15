import React, { useState, useEffect } from "react";
import "./Header.css";
import MovieSearch from "./MovieSearch .jsx";
import Dropdown from "./Dropdown";
import logo from "../img/Phim.png";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import { Link } from "react-router";

function Header() {
  const [allMovies, setAllMovies] = useState([]); // Danh sách phim từ API
  const [modalType, setModalType] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Fetch danh sách phim từ API
    fetch("http://localhost:5000/api/movies/released")
      .then((response) => response.json())
      .then((data) => setAllMovies(Array.isArray(data) ? data : [])) // Xử lý dữ liệu không hợp lệ
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setAllMovies([]);
      });
  }, []);

  const handleLoginClick = () => setModalType("login");
  const handleCloseModal = () => setModalType(null);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    window.location.reload();
  };

  const getDisplayName = () => {
    if (!loggedInUser || !loggedInUser.fullName) return "";
    const parts = loggedInUser.fullName.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : parts[0];
  };

  return (
    <div className="header-container flex justify-around w-[100%] items-center h-20">
      <Link to={"/"} className="w-fit h-20">
        <img className="w-28 h-[100%]" src={logo} alt="Logo" />
      </Link>

      <div className="flex justify-between gap-8 items-center h-fit text-gray-600">
        <Dropdown options={["HCM", "Hà-Nội", "Đà-Nẵng"]} placeholder="Rạp Chiếu" />
        <Dropdown options={["Ưu Đãi", "Phim Hay Tháng"]} placeholder="Sự Kiện" />
        <Dropdown options={["Phim đang chiếu", "Phim sắp chiếu"]} placeholder="Phim" />
        <p className="hover:text-orange-500">
          <Link to={"/"}>Mua vé</Link>
        </p>
        <a className="hover:text-orange-500" href="#">
          Blog Mê Phim
        </a>
       <>
       <MovieSearch movies={allMovies} onSearch={(term) => console.log("Tìm kiếm:", term)} />
       </>
      </div>

      <div className="ticket">
        {loggedInUser ? (
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <Link to="/Profile" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
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
          <Login isOpen={modalType === "login"} onClose={handleCloseModal} />
        )}
        {modalType === "register" && (
          <Register isOpen={modalType === "register"} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default Header;