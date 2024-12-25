import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { selectedMovieId, time } = useParams(); // Lấy tham số từ URL
  const [showtimeData, setShowtimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedMovieId && time) {
      const fetchShowtimeData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/showtimes/by-movie-and-time?movieId=${selectedMovieId}&time=${time}`);
          const data = await response.json();
          if (response.ok) {
            setShowtimeData(data);
          } else {
            setError(data.message || 'Lỗi khi lấy dữ liệu');
          }
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
          setError('Lỗi khi lấy dữ liệu');
        } finally {
          setLoading(false);
        }
      };
      
      fetchShowtimeData();
    }
  }, [selectedMovieId, time]);  // Chạy lại khi selectedMovieId hoặc time thay đổi

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!showtimeData) {
    return <div>Không có dữ liệu suất chiếu</div>;
  }

  // Xử lý dữ liệu khi showtimeData đã có
  const { movie, room, times } = showtimeData;

  return (
    <div>
      {/* Hiển thị thông tin suất chiếu */}
      <h1>{movie ? movie.title : 'Không rõ tên phim'}</h1>
      <p>Phòng: {room}</p>
      <p>Suất chiếu: {times}</p>
    </div>
  );
};

export default Booking;


