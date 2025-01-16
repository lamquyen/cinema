import React, { useState, useEffect } from "react";
import logo from "../img/Phim.png";
import Dropdown from "./Dropdown";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import { Link, useNavigate } from "react-router-dom";
import MovieSearch from "./MovieSearch .jsx";

function Header() {
  const options = ["HCM", "Hà-Nội", "Đà-Nẵng"];
  const events = [" Ưu Đãi", "Phim Hay Tháng"];
  const movies = ["Phim đang chiếu", "Phim sắp chiếu"];
  const [allMovies, setAllMovies] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userData = localStorage.getItem("loggedInUser");
      setLoggedInUser(userData ? JSON.parse(userData) : null);
    } catch (error) {
      console.error("Error parsing loggedInUser from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies/released")
      .then((response) => response.json())
      .then((data) => setAllMovies(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setAllMovies([]);
      });
  }, []);

  const handleLoginClick = () => setModalType("login");
  const handleRegisterClick = () => setModalType("register");
  const handleCloseModal = () => setModalType(null);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setTimeout(() => {
      setLoggedInUser(userData);
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
    if (!loggedInUser || !loggedInUser.fullName) return "";
    const parts = loggedInUser.fullName.trim().split(" ");
    return parts.length > 1 ? parts[parts.length - 1] : parts[0];
  };

  return (
    <div className="flex justify-around w-[100%] items-center h-fit border-b-8 border-gray-200 pb-2 pt-2">
      <Link to={"/"} className="w-fit h-20">
        <img className="w-28 h-[100%]" src={logo} alt="logo" />
      </Link>

      <div className="flex justify-between gap-4 items-center h-fit text-gray-600">
        <Dropdown
          options={options}
          placeholder="Rạp Chiếu"
          onSelect={(selected)}
          herf={'rap-chieu'}
        />
        <Dropdown
          options={events}
          placeholder="Sự Kiện"
          onSelect={(selected)}
        />
        <Dropdown
          options={movies}
          placeholder="Phim"
          onSelect={(selected)}
        />
        <p className="hover:text-orange-500">
          <Link to={"/"}>Mua vé</Link>
        </p>
        <a className="hover:text-orange-500" href="/Blog-movies">
          Blog Mê phim
        </a>
      </div>

      <div>
        <MovieSearch
          movies={allMovies}
          onSearch={(term) => console.log("Tìm kiếm:", term)}
        />
      </div>

      <div>
        {loggedInUser ? (
          <div className="flex gap-3 justify-center items-center">
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
            onLoginSuccess={handleLoginSuccess}
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
