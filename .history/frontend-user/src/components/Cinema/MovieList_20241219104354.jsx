import React from "react";

const MovieList = ({  selectedMovie, onMovieClick }) => {

  const movies = [
    {
      id: 1,
      title: "Gái Ngỏ Gặp Ma Lây",
      img: "https://cdn.galaxycine.vn/media/2024/11/29/gai-ngo-gap-ma-lay-500_1732863355133.jpg",
      rating: 9.3,
      type: "T16",
      showDates: ["2024-12-13", "2024-12-19"],
      showTimes: ["11:30", "14:45", "16:45"],
    },
    {
      id: 2,
      title: "Công Tử Bạc Liêu",
      img: "https://cdn.galaxycine.vn/media/2024/11/15/cong-tu-bac-lieu-500_1731641572864.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14"],
      showTimes: ["11:30", "14:45", "16:45"],
    },
    {
      id: 3,
      title: "Ngài Quỷ",
      img: "https://cdn.galaxycine.vn/media/2024/12/13/ngai-qu-500_1734082176805.jpg",
      rating: 8.0,
      type: "T13",
      showDates: ["2024-12-14", "2024-12-15"],
      showTimes: ["17:00", "21:10"],
    },
    {
      id: 4,
      title: "Linh Miêu: Quỷ Nhập Tràng",
      img: "https://cdn.galaxycine.vn/media/2024/11/14/linh-mieu-2_1731569950588.jpg",
      rating: 7.1,
      type: "T13",
      showDates: ["2024-12-14", "2024-12-15", "2024-12-16"],
      showTimes: ["11:30", "16:45", "18:00", "20:15", "22:30"],
    },
    {
      id: 5,
      title: "Hành Trình Của Moana 2",
      img: "https://cdn.galaxycine.vn/media/2024/12/4/moana-2-500_1733308287086.jpg",
      rating: 7.6,
      type: "T13",
      showDates: ["2024-12-14", "2024-12-15", "2024-12-16"],
      showTimes: ["11:30", "14:00", "16:45"],
    },
    // Thêm các phim khác...
  ];




  // Lấy ngày hiện tại
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Lọc phim theo ngày hiện tại
  const filteredMovies = movies.filter((movie) =>
    movie.showDates.some((showDate) => {
      try {
        const date = new Date(showDate); // Chuyển đổi sang Date
        if (isNaN(date)) throw new Error("Invalid Date"); // Kiểm tra nếu không hợp lệ
        return date.getTime() === today.getTime();
      } catch (error) {
        console.error("Invalid showDate:", showDate, error.message);
        return false;
      }
    })
  );

  return (
    <>
          <div className="grid grid-cols-5 gap-6 mt-6">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
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
           
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">
          Không có phim nào trong ngày này.
        </p>
      )}
    </div>
    {selectedMovie && (
                  <div className="showtimes mt-4 p-4 bg-gray-100 rounded-md shadow-md">
                    <h3 className="text-lg font-bold">Suất chiếu:</h3>
                    <div className="flex gap-2 mt-2">
                      {movies
                        .find((movie) => movie.id === selectedMovie)
                        .showTimes.map((time, index) => (
                          <button
                            key={index}
                            className="border border-gray-400 rounded-md px-4 py-1 hover:bg-blue-600 hover:text-white"
                          >
                            {time}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
    </>
  
  );
};

export default MovieList;
