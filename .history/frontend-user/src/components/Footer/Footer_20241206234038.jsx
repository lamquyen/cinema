import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="contentFooter">
        <div className="card">
          <p class="text-4x1 p-2 text-white font-medium  dark:text-white ">
            {" "}
            GIỚI THIỆU
          </p>
          <ul>
            <li>
              <a className="herf" href="#">
                {" "}
                Về chúng tôi
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Thoả thuận sử dụng
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Quy chế hoạt động
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </div>
        <div className="card">
          <p class="text-4x1 p-2 text-white font-medium  dark:text-white ">
            {" "}
            GÓC ĐIỆN ẢNH
          </p>
          <ul>
            <li>
              <a className="herf" href="#">
                Thể loại phim
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Bình luận phim
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Blog điện ảnh
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Phim hay tháng
              </a>
            </li>
          </ul>
        </div>
        <div className="card">
          <p class="text-4x1 p-2 text-white font-medium  dark:text-white ">
            {" "}
            HỖ TRỢ
          </p>
          <ul>
            <li>
              <a className="herf" href="#">
                Góp ý
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Sale & Services
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Rạp / Giá vé
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                Tuyển dụng
              </a>
            </li>
          </ul>
        </div>
        <div className="card">
          <p class="text-4x1 p-2 text-white font-medium  dark:text-white ">
            {" "}
            LIÊN LẠC
          </p>
          <ul>
            <li>
              <a className="herf" href="#">
                {" "}
                Gmail
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                {" "}
                Phone mumber
              </a>
            </li>
            <li>
              <a className="herf" href="#">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="px-2 py-3 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
          © 2023 <a href="#">PHIM VIỆT</a>. All Rights
          Reserved.
        </span>
        
      </div>
    </div>
  );
}

export default Footer;