import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CarouselBanner from "../HomeMovie/CarouselBanner";
import moment from "moment";
import "moment/locale/vi";
import "./Cinema.css";


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
    {
      id: 3,
      title: "Công Tử Bạc Liêu",
      img: "url-to-image-2",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
    },
    {
      id: 4,
      title: "Công Tử Bạc Liêu",
      img: "url-to-image-2",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
    },
    {
      id: 5,
      title: "Công Tử Bạc Liêu",
      img: "url-to-image-2",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
    },
    {
      id: 6,
      title: "Công Tử Bạc Liêu",
      img: "url-to-image-2",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
    },
    // Thêm các phim khác...
  ];



  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [startIndex, setStartIndex] = useState(0);
  const daysToShow = 5;

  const filteredMovies = movies.filter((movie) =>
    movie.showDates.includes(selectedDate)
  );
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  /* function hiển thị lịch chiếu*/
  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, "days");
      days.push({
        day: capitalizeFirstLetter(date.format("dddd")),
        date: date.format("DD/MM"),
        fullDate: date.format("YYYY-MM-DD"),
      });
    }
    return days;
  };

  const weekDays = getWeekDays();
  const handleNext = () => {
    if (startIndex + 2 + daysToShow - 2 < weekDays.length) {
      setStartIndex(startIndex + 2);
    }
  };
  const handlePrev = () => {
    if (startIndex - 2 >= 0) {
      setStartIndex(startIndex - 2);
    }
  };
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
              {/* Nút điều hướng */}
              <div className="flex items-center space-x-4 min-w-fit">
                <button onClick={handlePrev} className=" py-2 rounded ">
                  ❮
                </button>

                {/* Hiển thị các ngày */}
                <div className="flex overflow-hidden  ">
                  {weekDays
                    .slice(startIndex, startIndex + daysToShow)
                    .map((day) => (
                      <button
                        key={day.fullDate}
                        onClick={() => setSelectedDate(day.fullDate)}
                        className={`text-gray-700 text-base cursor-pointer text-center p-4 rounded transition-colors ${
                          selectedDate === day.fullDate
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="">{day.day}</div>
                        <div className="">{day.date}</div>
                      </button>
                    ))}
                </div>

                {/* Nút điều hướng */}
                <button
                  onClick={handleNext}
                  disabled={startIndex + daysToShow >= weekDays.length}
                  className="py-2 rounded "
                >
                  ❯
                </button>
              </div>
            </div>
            <div class="line"></div>
              {/* Hiển thị danh sách phim */}
      <div className="grid grid-cols-5 gap-6 mt-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className=" bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yellow-500 font-bold">{movie.rating}★</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {movie.type}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            Không có phim nào trong ngày này.
          </p>
        )}
      </div>
          
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cinema;
