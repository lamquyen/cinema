import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CarouselBanner from "../HomeMovie/CarouselBanner";

import "./Cinema.css";
import MovieSchedule from "./MovieSchedule";

function Cinema() {
  const items = [
    {
      image:
        "https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-tan-binh-1_1557134148145.jpg",
    },
    {
      image: "https://cdn.galaxycine.vn/media/2023/11/22/1_1700639852832.jpg",
    },
    {
      image:
        "https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-tan-binh-3_1557133920863.jpg",
    },
  ];
  const weekDays = [
    { day: "Hôm Nay", fullDate: "2024-12-13" },
    { day: "Thứ Bảy", fullDate: "2024-12-14" },
    { day: "Chủ Nhật", fullDate: "2024-12-15" },
  ];
  
  const movies = [
    {
      id: 1,
      title: "Gái Ngỏ Gặp Ma Lây",
      img: "url-to-image-1",
      rating: 9.3,
      type: "T16",
      showDates: ["2024-12-13", "2024-12-14"],
    },
    {
      id: 2,
      title: "Công Tử Bạc Liêu",
      img: "url-to-image-2",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
    },
    // Thêm các phim khác...
  ];

  
  return (
    <>
      <Header />
      <div>
        <div style={{ padding: "20px" }}>
          <CarouselBanner items={items} />
        </div>
        <div className="cinemaInfo">
          <div className="titleCinema">
            <div class="col-span-2 ml-[20%]">
              <h1 class="text-2xl  font-medium  dark:text-white mx-2">
                Rạp Hồ Chí Minh
              </h1>
              <p class="text-sm md:mt-5">
                <span class="text-grey-40">Địa chỉ:</span> 246 Nguyễn Hồng Đào,
                Q.TB, Tp.HCM{" "}
              </p>
              <p class="text-sm text-blue-10">
                <span class="text-grey-40">Hotline:</span>{" "}
                <a
                  class="text-blue-600 transition-all duration-300"
                  href="tel:1900 2224"
                >
                  1900 2224
                </a>{" "}
              </p>
            </div>
          </div>
          <div className="containerCinema">
            <div className="bg-white p-4">
              <div class="mb-4">
                <span class="border-l-4 border-solid border-blue-600 mr-2"></span>
                <h1 class="text-xl inline-block uppercase font-bold m-0">
                  Phim
                </h1>
              </div>
            </div>
            <div className="buttonChooseDay">
            <MovieSchedule weekDays={weekDays} movies={movies} />
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cinema;
