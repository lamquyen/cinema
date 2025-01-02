import React, { useState } from "react";
import "./Login.css";
import logo from "../img/logoLogin.svg";
import NotificationModal from "../NotificationModal/NotificationModal.jsx";
import axios from "axios";

function Login({ isOpen, onClose, onRegisterClick, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      const { data } = response;

      // Assuming 'data' is the user object or has a 'user' key
      const user = data.user || data;

      // Pass user data to onLoginSuccess to update state in Header
      onLoginSuccess(user);

      setModal({
        isOpen: true,
        title: "Success",
        message: "Đăng nhập thành công!",
      });

      setTimeout(() => {
        setModal({ isOpen: false, title: "", message: "" });
        onClose();
        window.location.reload();
      }, 3000);
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Error",
        message: "Đăng nhập thất bại. Vui lòng kiểm tra thông tin!",
      });
    }
  };

  const handleModalClose = () => {
    setModal({ isOpen: false, title: "", message: "" });
  };

  return (
    <div className={`realtive modal ${isOpen ? "is-open" : ""}`}>
      <div className="modal-content font-nunito absolute top-4 left-1/3 m-0  rounded-lg">
        <div className="login-container">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <img
            alt="Cartoon image of two dogs and a hat"
            src={logo}
            style={{ height: "100px", width: "200px" }}
          />
          <h2>Đăng Nhập Tài Khoản</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="Nhập Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="icon-input">
                <input
                  id="password"
                  placeholder="Nhập Mật khẩu"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <i className="fa fa-eye-slash"></i>
              </div>
            </div>
            <button className="btn" type="submit">
              ĐĂNG NHẬP
            </button>
          </form>
          <NotificationModal
            isOpen={modal.isOpen}
            onClose={handleModalClose}
            title={modal.title}
            message={modal.message}
          />
          <div className="forgot-password">Quên mật khẩu?</div>
          <hr />
          <div className="register">
            Bạn chưa có tài khoản?
            <a className="register-button" href="#" onClick={onRegisterClick}>
              Đăng ký
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
