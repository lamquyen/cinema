import React, { useState } from "react";
import "./MovieSearch.css"; // Tạo file CSS nếu cần thiết

const MovieSearch = ({ movies, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (onSearch) {
      onSearch(value); // Callback về parent component nếu cần
    }

    if (Array.isArray(movies)) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      console.error("Movies is not an array or is undefined.");
      setFilteredMovies([]); // Nếu không hợp lệ, đặt danh sách rỗng
    }
  };

  return (
    <div className="movie-search-container">
      <input
        type="text"
        className="movie-search-input"
        placeholder="Tìm kiếm phim..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <div className="movie-search-dropdown">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="movie-search-item"
                onClick={() => alert(`Bạn đã chọn phim: ${movie.title}`)}
              >
                {movie.title}
              </div>
            ))
          ) : (
            <div className="no-results">Không tìm thấy phim phù hợp</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearch;