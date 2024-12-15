import React, { useState } from "react";

function MovieSchedule  ({ weekDays, movies }) {
  const [selectedDate, setSelectedDate] = useState(weekDays[0]?.fullDate);

  // Lọc phim dựa trên ngày được chọn
  const filteredMovies = movies.filter((movie) =>
    movie.showDates.includes(selectedDate)
  );

  return (
    <div>
      {/* Thanh chọn ngày */}
      <div className="flex space-x-4 p-4">
        {weekDays.map((day) => (
          <button
            key={day.fullDate}
            onClick={() => setSelectedDate(day.fullDate)}
            className={`p-2 rounded-lg ${
              selectedDate === day.fullDate
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Hiển thị danh sách phim */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={movie.img}
                alt={movie.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yellow-500 font-bold">{movie.rating}★</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {movie.type}
                </span>
              </div>
              <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                Đặt vé
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            Không có phim nào trong ngày này.
          </p>
        )}
      </div>
      <div class="line"></div>
    </div>
  );
};

export default MovieSchedule