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
      img: "https://cdn.galaxycine.vn/media/2024/11/29/gai-ngo-gap-ma-lay-500_1732863355133.jpg",
      rating: 9.3,
      type: "T16",
      showDates: ["2024-12-13", "2024-12-14"],
      showTimes: ["11:30", "14:45", "16:45"]
    },
    {
      id: 2,
      title: "Công Tử Bạc Liêu",
      img: "https://cdn.galaxycine.vn/media/2024/11/15/cong-tu-bac-lieu-500_1731641572864.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
      showTimes: ["11:30", "14:45", "16:45"]
    },
    {
      id: 3,
      title: "Công Tử Bạc Liêu",
      img: "https://cdn.galaxycine.vn/media/2024/11/15/cong-tu-bac-lieu-500_1731641572864.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
      showTimes: ["11:30", "14:45", "16:45"]
    },
    {
      id: 4,
      title: "Công Tử Bạc Liêu",
      img: "https://cdn.galaxycine.vn/media/2024/11/15/cong-tu-bac-lieu-500_1731641572864.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
      showTimes: ["11:30", "16:45",]
    },
    {
      id: 5,
      title: "Công Tử Bạc Liêu",
      img: "https://cdn.galaxycine.vn/media/2024/11/15/cong-tu-bac-lieu-500_1731641572864.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
      showTimes: ["11:30", "14:45", "16:45"]
    },
    {
      id: 6,
      title: "Công Tử Bạc Liêu",
      img: "https://cdn.galaxycine.vn/media/2024/11/15/cong-tu-bac-lieu-500_1731641572864.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
      showTimes: ["11:30", "14:45", "16:45"]
    },
    // Thêm các phim khác...
  ];

  const [selectedMovie, setSelectedMovie] = useState(null);

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
  className={`relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl cardM ${
    selectedMovie === movie.id ? "border border-blue-500" : ""
  }`}
  onClick={() => setSelectedMovie(movie.id)}
>
  <img src={movie.img} className="imgBox" />
  <p className="text-2 p-1 text-black-600 mb-3 font-medium text-gray-900 dark:text-white mx-2">
    {movie.title}
  </p>
  <div className="votes">
    <span>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="star"
        className="svg-inline--fa fa-star text-yellow-300 ml-3 w-6"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path
          fill="currentColor"
          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        ></path>
      </svg>
    </span>
    <span className="text-[18px] font-bold text-white ml-5">
      {movie.rating}
    </span>
  </div>
  <div className="custom-bg text-white text-xs px-2 py-1 rounded">{movie.type}</div>
</div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            Không có phim nào trong ngày này.
          </p>
        )}
      </div>
      {selectedMovie && (
  <div className="showtimes bg-gray-100 p-4 mt-4 rounded-lg shadow-md">
    <h3 className="text-xl font-bold mb-2">Suất chiếu</h3>
    <div className="flex space-x-4">
      {/* Duyệt qua các suất chiếu */}
      {movies
        .find((movie) => movie.id === selectedMovie)
        .showTimes.map((time, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {time}
          </button>
        ))}
    </div>
  </div>
)}
          
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cinema;
