import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CarouselBanner from "../HomeMovie/CarouselBanner";
import moment from "moment";
import "moment/locale/vi";
import "./Cinema.css";
import axios from "axios";
import { useParams } from "react-router";
import CinemaCarousel from "./CinemaCarousel";
import CinemaInfo from "./CinemaInfo";
import ShowtimeSelector from "./ShowtimeSelector";
import MovieList from "./MovieList";

function Cinema() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [startIndex, setStartIndex] = useState(0);
  const { location } = useParams(); // Lấy "location" từ URL
  console.log(location);
  const [cinemas, setCinemas] = useState([]);
  const [showTime, setShowTime] = useState([]);
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


  useEffect(() => {
    async function fetchData() {
      try {
        const [cinemaResponse, showtimeResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/cinemas/${location}`),
          axios.get(`http://localhost:5000/api/showtimes/location/${location}`),
        ]);

        setCinemas(cinemaResponse.data);
        setShowTime(showtimeResponse.data);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "Network error"
        );
      }
    }
    fetchData();
  }, [location]);

  useEffect(() => {
    console.log("Cinemas state:", cinemas); // Kiểm tra cinemas sau khi cập nhật
    cinemas.forEach((cinema) => {
      console.log("Cinema Name:", cinema.cinemaName);
      console.log("Address:", cinema.address);
      console.log("Images:", cinema.img01);
    });
  }, [cinemas]); // Duyệt và in ra mỗi khi cinemas thay

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
        {cinemas.map((cinema, index) => (
          <>
            <CinemaCarousel images={cinema.img01} />
            <div className="cinemaInfo" key={index}>
              <CinemaInfo cinema={cinema} />
              <div className="containerCinema">
                <div className="bg-white p-4">
                  <div class="mb-4">
                    <span class="border-l-4 border-solid border-blue-600 mr-2"></span>
                    <h1 class="text-xl inline-block uppercase font-bold m-0">
                      Phim
                    </h1>
                  </div>
                </div>
                <ShowtimeSelector
                  weekDays={weekDays}
                  startIndex={startIndex}
                  daysToShow={daysToShow}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
                <div class="line"></div>
                {/* Hiển thị danh sách phim */}
                <MovieList
            movies={movies}
            selectedMovie={selectedMovie}
            onMovieClick={setSelectedMovie}
          />
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
                    <h1 className="text-xl inline-block uppercase font-bold m-0">
                      Giá Vé
                    </h1>
                  </div>
                  <ul className="cinemaTicketsPricing">
                    <li className="mb-4 text-center">
                      <img
                        className='inline object-cover object-cover duration-500 ease-in-out group-hover:opacity-100"
      scale-100 blur-0 grayscale-0)'
                        src="https://cdn.galaxycine.vn/media/2023/12/29/banggiave-2024-tan-binh---truong-chinh---kdv---trung-chanh_1703839866233.jpg"
                      ></img>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-4">
                  <div className="mb-4">
                    <span className="border-l-4 border-solid border-blue-600 mr-2"></span>
                    <h1 className="text-xl inline-block uppercase font-bold m-0">
                      THÔNG TIN CHI TIẾT
                    </h1>
                  </div>
                  <div className="">
                    <ul>
                      <li>
                        <span className="text-grey-400">Địa chỉ: </span>
                        <strong>{cinema.address}</strong>
                      </li>
                      <li>
                        <span className="text-grey-400">Số điện thoại</span>
                        <strong>1900 2224</strong>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <iframe
                        className="w-full h-[250px]"
                        src={cinema.maps}
                      ></iframe>
                    </div>
                    <div className="mt-4">
                      <p style={{ fontFamily: "sans-serif" }}>
                        {cinema.introduce01}
                      </p>
                      <p>&nbsp;</p>
                      <p style={{ fontFamily: "sans-serif" }}>
                        {" "}
                        {cinema.introduce02}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Cinema;
