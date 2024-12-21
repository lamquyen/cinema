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

  const today = new Date().toISOString().split("T")[0];
  const filteredShowtimes = showtimes.filter((showtime) => {
    const showDate = new Date(showtime.days).toISOString().split("T")[0];
    return showDate === today;
  });

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <MovieList
        showtimes={filteredShowtimes}
        onMovieClick={(movieId) => console.log("Clicked movie ID:", movieId)}
      />
    </div>
  );
};

export default MoviePage;