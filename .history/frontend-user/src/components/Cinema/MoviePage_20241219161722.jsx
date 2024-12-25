import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";

const MoviePage = ({ cinemaLocation }) => {
  const [showtimes, setShowtimes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShowtimes() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/showtimes/location/${cinemaLocation}`
        );
        setShowtimes(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu suất chiếu.");
      }
    }

    fetchShowtimes();
  }, [cinemaLocation]);

  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const movieId = showtime.movie._id;
    if (!acc[movieId]) {
      acc[movieId] = {
        movie: showtime.movie,
        times: [],
      };
    }
    acc[movieId].times.push(showtime.times);
    return acc;
  }, {});

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <MovieList
        groupedShowtimes={groupedShowtimes}
      />
    </div>
  );
};

export default MoviePage;
