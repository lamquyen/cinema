import React, { useState, useEffect } from "react";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]); // Danh sách phim từ API
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị input tìm kiếm
  const [filteredMovies, setFilteredMovies] = useState([]); // Danh sách phim đã lọc

  useEffect(() => {
    // Gọi API để lấy danh sách phim chiếu rạp
    fetch("http://localhost:5000/api/movies/released")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  useEffect(() => {
    // Lọc phim dựa trên từ khóa tìm kiếm
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  return (
    <div className="movie-search">
      <div>
        <input
          className="border-1-red p-1"
          placeholder="Tìm kiếm ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
        />
      </div>
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <p>Release Date: {movie.releaseDate}</p>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;