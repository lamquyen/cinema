import React from "react";
import "./Register.css";
import logo from "../img/logoLogin.svg";

function Register({ isOpen, onClose, onLoginClick }) {
  return (
    <div className={`modal ${isOpen ? "is-open" : ""}`}>
      <div className="modal-content">
        {/* Nội dung form đăng nhập ở đây */}
        <div className="register-container">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <img
            alt="Cartoon image of two dogs and a hat"
            src={logo}
            style={{ height: "200px", width: "200px" }}
          />
          <h2>Đăng Ký Tài Khoản</h2>
          <div className="form-group">
            <label for="name">Họ và tên</label>
            <input id="name" placeholder="Nhập Họ và tên" type="text" />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input id="email" placeholder="Nhập Email" type="email" />
          </div>
          <div className="form-group">
            <label for="phone">Số điện thoại</label>
            <input id="phone" placeholder="Nhập Số điện thoại" type="text" />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <div className="radio-group">
              <input id="male" name="gender" type="radio" value="male" />
              <label for="male">Nam</label>
              <input id="female" name="gender" type="radio" value="female" />
              <label for="female">Nữ</label>
            </div>
          </div>
          <div className="form-group">
            <label for="dob">Ngày sinh</label>
            <div class="icon-input">
              <input id="dob" placeholder="Ngày/Tháng/Năm" type="date" />
              <i className="fa fa-calendar-alt"></i>
            </div>
          </div>
          <div className="form-group">
            <label for="password">Mật khẩu</label>
            <div className="icon-input">
              <input
                id="password"
                placeholder="Nhập Mật khẩu"
                type="password"
              />
              <i className="fa fa-eye-slash"></i>
            </div>
          </div>
          <div className="form-group">
            <label for="confirm-password">Nhập lại mật khẩu</label>
            <div className="icon-input">
              <input
                id="confirm-password"
                placeholder="Nhập lại mật khẩu"
                type="password"
              />
              <i className="fa fa-eye-slash"></i>
            </div>
          </div>
          <div className="form-group">
            <div className="checkbox-group">
              <input id="terms" type="checkbox" />
              <label className="terms" for="terms">
                Bằng việc đăng ký tài khoản, tôi đồng ý với
                <a href="#"> Điều khoản dịch vụ </a> và
                <a href="#"> Chính sách bảo mật </a> của Galaxy Cinema.
              </label>
            </div>
          </div>
          <button className="btn">HOÀN THÀNH</button>
          <div className="login-link">
            Bạn đã có tài khoản?
            <a className="login-button" href="#" onClick={onLoginClick}>
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
