import React, { useState } from "react";

const MovieList = ({ groupedShowtimes, onMovieClick }) => {
  const [expandedMovie, setExpandedMovie] = useState(null); // Trạng thái để theo dõi phim được mở rộng

  return (
    <div className="grid grid-cols-5 gap-6 mt-6">
      {Object.keys(groupedShowtimes).map((movieId) => {
        const { movie, times } = groupedShowtimes[movieId];
        const isExpanded = expandedMovie === movieId;

        return (
          <>
          <div
            key={movieId}
            className="relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl"
          >
            {/* Hình ảnh và thông tin phim */}
            <img
              src={movie.img}
              alt={movie.title}
              className="w-full rounded-md"
              onClick={() => setExpandedMovie(isExpanded ? null : movieId)} // Toggle trạng thái mở rộng
            />
            <h3 className="text-lg font-bold mt-2">{movie.title}</h3>

            {/* Hiển thị giờ chiếu nếu mở rộng */}
          </div>
          {isExpanded && (
              <div className="mt-2">
                <h4 className="text-sm font-bold">Giờ chiếu:</h4>
                <ul className="list-disc ml-4">
                  {times.map((time, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-500 cursor-pointer hover:underline"
                      onClick={() => onMovieClick(movieId, time)}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        
        );
      })}
    </div>
  );
};

export default MovieList;