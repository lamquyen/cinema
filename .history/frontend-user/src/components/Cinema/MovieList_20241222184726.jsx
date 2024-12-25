import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieList = ({ groupedShowtimes, onTimeClick }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId((prev) => (prev === movieId ? null : movieId)); // Toggle chọn phim
  };

  return (
    <div>
      {/* Danh sách phim */}
      <div className="grid grid-cols-5 gap-6 mt-6">
        {Object.keys(groupedShowtimes).map((movieId) => {
          const { movie, times } = groupedShowtimes[movieId];
          const isSelected = selectedMovieId === movieId;

          return (
            <div
              key={movieId}
              className={`relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl ${
                isSelected ? "border-4 border-orange-500" : ""
              }`}
              onClick={() => handleMovieClick(movieId)}
            >
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full h-56 object-cover rounded-md"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-yellow-500 font-bold">{movie.rating}★</span>
                <span className={`px-2 py-1 rounded bg-orange-500 text-white text-xs`}>
                  {movie.type}
                </span>
              </div>
              <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Hiển thị giờ chiếu của phim được chọn */}
      {selectedMovieId && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold mb-2">Suất chiếu</h4>
          <div className="flex gap-4">
  {groupedShowtimes[selectedMovieId].times.map(({ id, time }) => (
    <Link
      key={id} // ID suất chiếu
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      to={`/Booking/${selectedMovieId}/${id}`} // Truyền ID suất chiếu vào URL
      onClick={() => onTimeClick(id)} // Gọi callback với ID suất chiếu
    >
      {time}
    </Link>
  ))}
</div>

        </div>
      )}
    </div>
  );
};

export default MovieList;
