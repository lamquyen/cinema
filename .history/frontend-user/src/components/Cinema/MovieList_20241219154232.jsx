import React from "react";

const MovieList = ({ showtimes, onMovieClick }) => {
  return (
    <div className="grid grid-cols-5 gap-6 mt-6">
      {showtimes.length > 0 ? (
        showtimes.map((showtime) => (
          <div
            key={showtime._id}
            className="relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl"
            onClick={() => onMovieClick(showtime.movie._id)}
          >
            <img
              src={showtime.movie.img}
              alt={showtime.movie.title}
              className="w-full rounded-md"
            />
            <h3 className="text-lg font-bold mt-2">{showtime.movie.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{showtime.room}</p>
            <p className="text-sm text-gray-500 mt-1">
              Giờ chiếu: {showtime.times}
            </p>
          </div>
        ))
      ) : (
        <p className="col-span-5 text-center text-gray-500">
          Không có suất chiếu nào trong ngày này.
        </p>
      )}
    </div>
  );
};

export default MovieList;