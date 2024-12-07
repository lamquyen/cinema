import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Gửi request đến API backend
        const response = await axios.get("/api/user/profile"); // Thay thế bằng endpoint thực tế
        setUser(response.data); // Đảm bảo backend trả về dữ liệu đúng định dạng
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = () => {
    console.log("User data to update:", user);
    alert("Thông tin cá nhân đã được cập nhật!");
  };

  return (
    <div className="container">
      <div className="nav-tabs">
        <a href="#">Lịch Sử Giao Dịch</a>
        <a href="#" className="active">
          Thông Tin Cá Nhân
        </a>
        <a href="#">Thông Báo</a>
        <a href="#">Quà Tặng</a>
        <a href="#">Chính Sách</a>
      </div>
      <div className="form-group">
        <label htmlFor="name">Họ và tên</label>
        <div style={{ position: "relative", width: "calc(50% - 10px)" }}>
          <i className="fas fa-user"></i>
          <input type="text" id="name" value={user.name} disabled />
        </div>
        <label htmlFor="dob">Ngày sinh</label>
        <div style={{ position: "relative", width: "calc(50% - 10px)" }}>
          <i className="fas fa-calendar-alt"></i>
          <input type="text" id="dob" value={user.dob} disabled />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div style={{ position: "relative", width: "calc(50% - 10px)" }}>
          <i className="fas fa-envelope"></i>
          <input type="text" id="email" value={user.email} disabled />
          <span className="change-link">Thay đổi</span>
        </div>
        <label htmlFor="phone">Số điện thoại</label>
        <div style={{ position: "relative", width: "calc(50% - 10px)" }}>
          <i className="fas fa-phone"></i>
          <input type="text" id="phone" value={user.phone} disabled />
        </div>
      </div>
      <div className="form-group gender">
        <label>Giới tính</label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={user.gender === "male"}
          disabled
        />
        <label htmlFor="male">Nam</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={user.gender === "female"}
          disabled
        />
        <label htmlFor="female">Nữ</label>
      </div>
      <button className="btn-update" onClick={handleUpdate}>
        Cập nhật
      </button>
    </div>
  );
};

export default Profile;
