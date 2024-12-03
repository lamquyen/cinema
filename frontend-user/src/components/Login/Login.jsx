import React from "react";
import "./Login.css";
import logo from "../img/logoLogin.svg";

function Login({ isOpen, onClose, onRegisterClick }) {
  return (
    <div className={`modal ${isOpen ? "is-open" : ""}`}>
      <div className="modal-content">
        <div className="login-container">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <img
            alt="Cartoon image of two dogs and a hat"
            src={logo}
            style={{ height: "200px", width: "200px" }}
          />
          <h2>Đăng Nhập Tài Khoản</h2>
          <form>
            <label htmlFor="email">Email</label>
            <input id="email" placeholder="Nhập Email" type="email" />
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-group">
              <input
                id="password"
                placeholder="Nhập Mật khẩu"
                type="password"
              />
              <i className="fas fa-eye"></i>
            </div>
            <button type="submit">ĐĂNG NHẬP</button>
          </form>
          <div className="forgot-password">Quên mật khẩu?</div>
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
