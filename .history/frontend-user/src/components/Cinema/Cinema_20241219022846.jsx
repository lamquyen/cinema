import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import moment from "moment";
import "moment/locale/vi";
import "./Cinema.css";
import axios from "axios";
import { useParams } from "react-router";
import CinemaCarousel from "./CinemaCarousel";
import CinemaInfo from "./CinemaInfo";
import ShowtimeSelector from "./ShowtimeSelector";
import MovieList from "./MovieList";
import TicketPricing from "./TicketPricing";

function Cinema() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [startIndex, setStartIndex] = useState(0);
  const { location } = useParams(); // Lấy "location" từ URL
  console.log(location);
  const [cinemas, setCinemas] = useState([]);
  const [showTime, setShowTime] = useState([])
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
      showDates: ["2024-12-13", "2024-12-19"],
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
      showDates: ["2024-12-14", "2024-12-15"],
      showTimes: ["17:00", "21:10"],
    },
    {
      id: 4,
      title: "Linh Miêu: Quỷ Nhập Tràng",
      img: "https://cdn.galaxycine.vn/media/2024/11/14/linh-mieu-2_1731569950588.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14", "2024-12-15", "2024-12-16"],
      showTimes: ["11:30", "16:45", "18:00", "20:15", "22:30"],
    },
    {
      id: 5,
      title: "Hành Trình Của Moana 2",
      img: "https://cdn.galaxycine.vn/media/2024/12/4/moana-2-500_1733308287086.jpg",
      rating: 7.6,
      type: "T13",
      showDates: ["2024-12-14", "2024-12-15", "2024-12-16"],
      showTimes: ["11:30", "14:00", "16:45"],
    },
    // Thêm các phim khác...
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
        setError(error.response ? error.response.data.message : "Network error");
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
      {cinemas.map((cinema) => (
        <div key={cinema.id}>
          <CinemaCarousel images={cinema.img01} />
          <CinemaInfo cinema={cinema} />
          <ShowtimeSelector
            weekDays={weekDays}
            startIndex={startIndex}
            daysToShow={daysToShow}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
          <MovieList
            movies={[] /* Filtered Movies */}
            selectedMovie={selectedMovie}
            onMovieClick={setSelectedMovie}
          />
          <TicketPricing image="https://cdn.galaxycine.vn/media/2023/12/29/banggiave-2024-tan-binh---truong-chinh---kdv---trung-chanh_1703839866233.jpg" />
        </div>
      ))}
      <Footer />
  </>
  );
}

export default Cinema;
