import React, { useState } from "react";

import "./ProfileUser.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Information from "./Information";
import Transaction from "./Transaction";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("transaction");
  const handleTabClick = (tab, e) => {
    e.preventDefault();
    console.log(`Changing to tab: ${tab}`);
    setActiveTab(tab); // cập nhật tab được chọn
  };
  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="nav-tabs ">
          <a
            href="#"
            onClick={(e) => handleTabClick("transaction", e)}
            className={activeTab === "transaction" ? "active" : ""}
          >
            Lịch Sử Giao Dịch
          </a>
          <a
            href="#"
            onClick={(e) => handleTabClick("information", e)}
            className={activeTab === "information" ? "active" : ""}
          >
            Thông Tin Cá Nhân
          </a>
          <a href="#">Thông Báo</a>
          <a href="#">Quà Tặng</a>
          <a href="#">Chính Sách</a>
        </div>
        {activeTab === "information" && <Information />}
        {activeTab === "transaction" && <Transaction />}

      </div>
      <Footer />
    </div>
  );
};

export default Profile;