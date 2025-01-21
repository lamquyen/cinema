// sampleData.js

export const sampleData = {
    theaters: [
      {
        name: "Galaxy Tân Bình",
        rooms: [
          {
            name: "Rạp 1",
            showtimes: [
              {
                timeRange: "9:00-12:00",
                movie: {
                  title: "Phim A",
                  duration: 90,
                  status: "Phim đã chiếu",
                  poster: "url-to-poster-A.jpg",
                },
              },
              {
                timeRange: "13:00-16:00",
                movie: {
                  title: "Phim B",
                  duration: 100,
                  status: "Phim đang chiếu",
                  poster: "url-to-poster-B.jpg",
                },
              },
              {
                timeRange: "17:00-20:00",
                movie: {
                  title: "Phim C",
                  duration: 80,
                  status: "Đã có phim chiếu",
                  poster: "url-to-poster-C.jpg",
                },
              },
              {
                timeRange: "21:00",
                movie: null, // Rạp trống
              },
            ],
          },
          {
            name: "Rạp 2",
            showtimes: [/* Tương tự như trên */],
          },
        ],
      },
      {
        name: "Galaxy Nguyễn Trãi",
        rooms: [
          {
            name: "Rạp 1",
            showtimes: [/* Tương tự như trên */],
          },
        ],
      },
    ],
  };
  