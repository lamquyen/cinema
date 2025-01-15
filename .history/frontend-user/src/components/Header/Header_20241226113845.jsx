import React, { useState, useEffect } from "react";
import "./Header.css";
import MovieSearch from "./MovieSearch";
import logo from "../img/Phim.png";
import Dropdown from "./Dropdown";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import { Link } from "react-router";

function Header() {
  const options = ["HCM", "Hà-Nội", "Đà-Nẵng"];
  const events = ["Ưu Đãi", "Phim Hay Tháng"];
  const movies = ["Phim đang chiếu", "Phim sắp chiếu"];

  const [modalType, setModalType] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    // Lấy danh sách phim từ API khi component được load
    fetch("http://localhost:5000/api/movies/released")
      .then((response) => response.json())
      .then((data) => setAllMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleLoginClick = () => setModalType("login");
  const handleRegisterClick = () => setModalType("register");
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
    <div className="flex justify-around w-[100%] items-center h-20 ">
      <Link to={"/"} className="w-fit h-20">
        <img className="w-28 h-[100%]" src={logo} />
      </Link>

      <div className="flex justify-between gap-8 items-center h-fit text-gray-600">
        <Dropdown options={options} placeholder="Rạp Chiếu" onSelect={() => {}} />
        <Dropdown options={events} placeholder="Sự Kiện" onSelect={() => {}} />
        <Dropdown options={movies} placeholder="Phim" onSelect={() => {}} />
        <p className="hover:text-orange-500">
          <Link to={"/"}>Mua vé</Link>
        </p>
        <a className="hover:text-orange-500" href="#">
          Blog Mê Phim
        </a>
        <MovieSearch onSearch={handleSearch} />
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
            onLoginSuccess={(userData) => {
              localStorage.setItem("loggedInUser", JSON.stringify(userData));
              setLoggedInUser(userData);
              handleCloseModal();
            }}
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

      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                {movie.title} - {movie.releaseDate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Header;