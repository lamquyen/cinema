import React, { useState } from "react";

const MovieList = ({ groupedShowtimes, onTimeClick }) => {
  const [expandedMovie, setExpandedMovie] = useState(null); // Theo dõi phim đang mở chi tiết suất chiếu

  const toggleExpand = (movieId) => {
    setExpandedMovie((prev) => (prev === movieId ? null : movieId));
  };

  return (
    <div className="mt-6">
      {Object.keys(groupedShowtimes).length > 0 ? (
        <div className="grid grid-cols-5 gap-6">
          {Object.keys(groupedShowtimes).map((movieId) => {
            const { movie, times } = groupedShowtimes[movieId];
            return (
              <div
                key={movieId}
                className="relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl"
              >
                {/* Phần hình ảnh và thông tin phim */}
                <div
                  onClick={() => toggleExpand(movieId)}
                  className="cursor-pointer"
                >
                  <img
                    src={movie.img}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-yellow-500 font-bold">
                      {movie.rating}★
                    </span>
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      {movie.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mt-2 text-center">
                    {movie.title}
                  </h3>
                </div>

                {/* Suất chiếu - chỉ hiển thị khi phim được mở rộng */}
                {expandedMovie === movieId && (
                  <div className="mt-4 bg-white p-4 rounded-lg shadow">
                    <h4 className="text-base font-bold mb-2">Suất chiếu</h4>
                    <div className="flex flex-wrap gap-3">
                      {times.length > 0 ? (
                        times.map((time, index) => (
                          <button
                            key={index}
                            onClick={() => onTimeClick(movieId, time)}
                            className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                          >
                            {time}
                          </button>
                        ))
                      ) : (
                        <p className="text-gray-500">Không có suất chiếu.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Không có phim nào trong ngày này.
        </p>
      )}
    </div>
  );
};

export default MovieList;

