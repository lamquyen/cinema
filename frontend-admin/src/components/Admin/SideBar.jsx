import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Admin.css";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Ngăn điều hướng mặc định của NavLink
    localStorage.removeItem("adminToken"); // Xóa token admin
    navigate("/"); // Điều hướng về trang chủ
  };
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/Dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-th-large"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Movie-List"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-film"></i>
              Movies List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Cinema"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-plus-circle"></i>
              Cinema
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Screening"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-plus-circle"></i>
              Screening
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/RevenueAndRoom"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-plus-circle"></i>
              RevenueAndRoom
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-users"></i>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/booking"

              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-user-cog"></i>
              Booking
              Booking
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              onClick={handleLogout}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-sign-out-alt"></i>
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
