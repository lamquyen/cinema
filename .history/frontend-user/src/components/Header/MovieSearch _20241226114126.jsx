import React, { useState } from "react";

const MovieSearch = ({ movies, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (onSearch) {
      onSearch(value); // Gửi dữ liệu tìm kiếm về parent component
    }

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
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
                onClick={() => alert(`You selected: ${movie.title}`)}
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