import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CarouselBanner from "../HomeMovie/CarouselBanner";
import moment from "moment";
import "moment/locale/vi";
import "./Cinema.css";
import axios from "axios";
import { useParams } from "react-router";

function Cinema() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [startIndex, setStartIndex] = useState(0);
  const { location } = useParams(); // Lấy "location" từ URL
  console.log(location);
  const [cinemas, setCinemas] = useState([]);
  const [error, setError] = useState("");
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
      showTimes: ["11:30", "14:45", "16:45"],
    },
    {
      id: 2,
      title: "Công Tử Bạc Liêu",
      img: "https://cdn.galaxycine.vn/media/2024/11/15/cong-tu-bac-lieu-500_1731641572864.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
      showTimes: ["11:30", "14:45", "16:45"],
    },
    {
      id: 3,
      title: "Ngài Quỷ",
      img: "https://cdn.galaxycine.vn/media/2024/12/13/ngai-qu-500_1734082176805.jpg",
      rating: 8.0,
      type: "T13",
      showDates: ["2024-12-14","2024-12-15"],
      showTimes: ["17:00", "21:10"],
    },
    {
      id: 4,
      title: "Linh Miêu: Quỷ Nhập Tràng",
      img: "https://cdn.galaxycine.vn/media/2024/11/14/linh-mieu-2_1731569950588.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14","2024-12-15","2024-12-16"],
      showTimes: ["11:30", "16:45","18:00","20:15","22:30"],
    },
    {
      id: 5,
      title: "Hành Trình Của Moana 2",
      img: "https://cdn.galaxycine.vn/media/2024/12/4/moana-2-500_1733308287086.jpg",
      rating: 7.6,
      type: "T13",
      showDates: ["2024-12-14","2024-12-15","2024-12-16"],
      showTimes: ["11:30", "14:00", "16:45"],
    },
    // Thêm các phim khác...
  ];


 
  
  useEffect(() => {
    async function fetchCinemas() {
      try {
        const response = await axios.get(`http://localhost:5000/api/cinemas/${location}`);
        setCinemas(response.data);
        console.log(response.data)
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Network error");
        }
      }
    }
    fetchCinemas();
    console.log(cinemas)
  }, [location]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  
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

  const handleMovieClick = (movieId) => {
    // Nếu phim đang được chọn, bỏ chọn (ẩn suất chiếu)
    if (selectedMovie === movieId) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movieId); // Nếu không, chọn phim mới và hiển thị suất chiếu
    }
  };
  return (
    <>
      <Header />
      <div>
        <div style={{ padding: "20px" }}>
          <CarouselBanner items={items} />
        </div>
       {cinemas.map((cinema)=>{
        <div className="cinemaInfo" key={cinema._id}>
          <div className="titleCinema">
            <div class="col-span-2 ml-[20%]">
              <h1 class="text-2xl  font-medium  dark:text-white mx-2">
                {cinema.cinemaName}
              </h1>
              <p class="text-sm md:mt-5">
                <span class="text-grey-40">Địa chỉ:</span> {cinemas.address}
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
                    className={`relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl ${
                      selectedMovie === movie.id ? "border border-blue-500" : ""
                    }`}
                    onClick={() => handleMovieClick(movie.id)} // Dùng hàm xử lý này
                  >
                    <img
                      src={movie.img}
                      alt={movie.title}
                      className="w-full rounded-md"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-yellow-500 font-bold">
                        {movie.rating}★
                      </span>
                      <span className="custom-bg text-white text-xs px-2 py-1 rounded">
                        {movie.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500">
                  Không có phim nào trong ngày này.
                </p>
              )}
            </div>
            {selectedMovie && (
              <div className="showtimes mt-4 p-4 bg-gray-100 rounded-md shadow-md">
                <h3 className="text-lg font-bold">Suất chiếu:</h3>
                <div className="flex gap-2 mt-2">
                  {movies
                    .find((movie) => movie.id === selectedMovie)
                    .showTimes.map((time, index) => (
                      <button
                        key={index}
                        className="border border-gray-400 rounded-md px-4 py-1 hover:bg-blue-600 hover:text-white"
                      >
                        {time}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 mt-8  my-0 mx-auto  py-6 (24px px-[16px] bg-white max-w-[1200px] ">
            <div className="bg-white p-4">
              <div className="mb-4">
                <span className="border-l-4 border-solid border-blue-600 mr-2"></span>
                <h1 className="text-xl inline-block uppercase font-bold m-0">Giá Vé</h1>
              </div>
              <ul className="cinemaTicketsPricing">
                <li className="mb-4 text-center">
                    <img className="inline object-cover object-cover duration-500 ease-in-out group-hover:opacity-100&quot;
      scale-100 blur-0 grayscale-0)" src="https://cdn.galaxycine.vn/media/2023/12/29/banggiave-2024-tan-binh---truong-chinh---kdv---trung-chanh_1703839866233.jpg"></img>
                </li>
              </ul>
            </div>
            <div className="bg-white p-4">
              <div className="mb-4">
                  <span className="border-l-4 border-solid border-blue-600 mr-2"></span>
                  <h1 className="text-xl inline-block uppercase font-bold m-0">THÔNG TIN CHI TIẾT</h1>
              </div>
              <div className="">
                  <ul>
                    <li>
                      <span className="text-grey-400">Địa chỉ: </span>
                      <strong>{cinemas.address}</strong>
                    </li>
                    <li>
                      <span className="text-grey-400">Số điện thoại</span>
                      <strong>1900 2224</strong>
                    </li>
                  </ul>
                  <div className="mt-4">
                      <iframe className="w-full h-[250px]" src={cinemas.maps}></iframe>
                  </div>
                  <div className="mt-4">
                      <p style={{fontFamily:"sans-serif"}}>{cinemas.introduce01}</p>
                      <p >&nbsp;</p>
                      <p style={{fontFamily:"sans-serif"}}> {cinemas.introduce02}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
       })}
       
      </div>

      <Footer />
    </>
  );
}

export default Cinema;
