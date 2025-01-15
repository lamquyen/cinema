import React, { useState } from "react";

import "./Profile.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import moment from "moment";
import Information from "./Information";
import Transaction from "./Transaction";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("information");
  const handleTabClick = (tab, e) => {
    e.preventDefault();
    console.log(`Changing to tab: ${tab}`);
    setActiveTab(tab); // cập nhật tab được chọn
  };
  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="nav-tabs">
          <button
            onClick={(e) => handleTabClick("transaction", e)}
            className={activeTab === "transaction" ? "active" : ""}
          >
            Lịch Sử Giao Dịch
          </button>
          <button
            onClick={(e) => handleTabClick("information", e)}
            className={activeTab === "information" ? "active" : ""}
          >
            Thông Tin Cá Nhân
          </button>
          <button>Thông Báo</button>
          <button>Quà Tặng</button>
          <button>Chính Sách</button>
        </div>
        {activeTab === "information" && <Information />}
        {activeTab === "transaction" && <Transaction />}

      </div>
      <Footer />
    </div>
  );
};

export default Profile;