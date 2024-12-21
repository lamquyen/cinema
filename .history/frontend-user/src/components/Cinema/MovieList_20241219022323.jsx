import React from "react";

const MovieList = ({ movies, selectedMovie, onMovieClick }) => {
  return (
    <div className="grid grid-cols-5 gap-6 mt-6">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            className={`relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl ${
              selectedMovie === movie.id ? "border border-blue-500" : ""
            }`}
            onClick={() => onMovieClick(movie.id)}
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
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">
          Không có phim nào trong ngày này.
        </p>
      )}
    </div>
  );
};

export default MovieList;
