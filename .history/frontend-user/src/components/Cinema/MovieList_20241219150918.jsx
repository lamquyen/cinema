import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieList = ({ cinemaLocation }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    async function fetchShowtimes() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/showtimes/cinema/${cinemaLocation}`
        );
        const showtimes = response.data;

        // Chuyển đổi dữ liệu từ API
        const movieList = showtimes.map((showtime) => ({
          id: showtime.movie.id,
          title: showtime.movie.title,
          img: showtime.movie.img,
          rating: showtime.movie.rating,
          type: showtime.movie.type,
          showDates: showtime.showDates,
          showTimes: showtime.showTimes,
        }));

        setMovies(movieList);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
      }
    }

    fetchShowtimes();
  }, [cinemaLocation]);

  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId);
  };

  // Lọc phim chiếu trong ngày hôm nay
  const filteredMovies = movies.filter((movie) =>
    movie.showDates.some((showDate) => {
      const date = new Date(showDate);
      return date.getTime() === today.getTime();
    })
  );

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-5 gap-6 mt-6">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className={`relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl ${
              selectedMovie === movie.id ? "border border-blue-500" : ""
            }`}
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={movie.img}
              alt={movie.title}
              className="w-full rounded-md"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-yellow-500 font-bold">{movie.rating}★</span>
              <span className="custom-bg text-white text-xs px-2 py-1 rounded">
                {movie.type}
              </span>
            </div>
            <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
            <div className="mt-2">
              <h4 className="font-semibold">Giờ chiếu:</h4>
              <ul>
                {movie.showTimes.map((time, index) => (
                  <li key={index} className="text-gray-600">
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-5 text-center text-gray-500">
          Không có phim nào trong ngày này.
        </p>
      )}
    </div>
  );
};

export default MovieList;