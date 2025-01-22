import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieList = ({ groupedShowtimes }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Hàm kiểm tra nếu suất chiếu đã qua
  const isShowtimeExpired = (showtime, day) => {
    const [hours, minutes] = showtime.split(':'); // Tách giờ và phút từ chuỗi thời gian
    const showDate = new Date(day); // Lấy ngày của suất chiếu
    showDate.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Gán giờ, phút vào ngày của suất chiếu

    return showDate < new Date(); // Kiểm tra nếu suất chiếu đã qua
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId((prev) => (prev === movieId ? null : movieId)); // Toggle chọn phim
  };

  return (
    <div>
      {/* Danh sách phim */}
      <div className="grid grid-cols-5 gap-6 mt-6">
        {Object.keys(groupedShowtimes).map((movieId) => {
          const { movie, times, days } = groupedShowtimes[movieId];
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
                <span className="text-yellow-500 font-bold">
                  {movie.rating}★
                </span>
                <span
                  className={`px-2 py-1 rounded bg-orange-500 text-white text-xs`}
                >
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
            {groupedShowtimes[selectedMovieId].times.map(({ id, time }) => {
              const day = groupedShowtimes[selectedMovieId].days[0]; // Lấy ngày đầu tiên từ mảng days
              const showtimeExpired = isShowtimeExpired(time, day); // Kiểm tra nếu suất chiếu đã qua

              return (
                <Link
                  key={id}
                  className={`px-4 py-2 rounded text-white ${
                    showtimeExpired
                      ? "bg-gray-500 cursor-not-allowed" // Không cho bấm nếu suất chiếu đã qua
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  to={showtimeExpired ? "#" : `/Booking/${id}`} // Vô hiệu hóa link nếu suất chiếu đã qua
                >
                  {time}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;