import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "./Admin.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Movie đang được chỉnh sửa
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // Trạng thái Modal thông báo
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false); // Modal thông báo thất bại
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Modal xác nhận xóa
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false); // Modal thông báo xóa thành công

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies/");
        setMovies(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch movies. Please try again.");
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleEditClick = async (movieId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movie/${movieId}`
      );
      setSelectedMovie(response.data); // Lấy thông tin phim được chọn
      setIsModalVisible(true); // Hiển thị modal
    } catch (error) {
      console.error("Failed to fetch movie by ID:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMovie({ ...selectedMovie, [name]: value });
  };

  const handleUpdateMovie = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/movie/${selectedMovie._id}`,
        selectedMovie
      );
      // Cập nhật danh sách phim trong state
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === selectedMovie._id ? selectedMovie : movie
        )
      );
      setIsSuccessModalVisible(true); // Hiển thị modal thông báo
      setTimeout(() => setIsSuccessModalVisible(false), 3000); // Tự động đóng sau 3 giây
    } catch (error) {
      setIsErrorModalVisible(true); // Hiển thị modal thất bại
      setTimeout(() => setIsErrorModalVisible(false), 3000); // Tự động đóng modal
    }
  };

  const handleDeleteClick = (movieId) => {
    // Hiển thị modal xác nhận xóa
    const movieToDelete = movies.find((movie) => movie._id === movieId);
    setSelectedMovie(movieToDelete);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Gọi API DELETE để xóa phim
      await axios.delete(
        `http://localhost:5000/api/movie/${selectedMovie._id}`
      );
      // Cập nhật danh sách phim trong state
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== selectedMovie._id)
      );
      setSelectedMovie(null);
      setIsDeleteModalVisible(false); // Đóng modal xác nhận
      setIsDeleteSuccessModalVisible(true); // Hiển thị modal xóa thành công
      setTimeout(() => setIsDeleteSuccessModalVisible(false), 3000); // Tự động đóng modal sau 3 giây
    } catch (error) {
      console.error("Failed to delete movie:", error);
      setIsErrorModalVisible(true);
      setTimeout(() => setIsErrorModalVisible(false), 3000); // Tự động đóng modal
    }
  };

  const handleDeleteCancel = () => {
    setSelectedMovie(null);
    setIsDeleteModalVisible(false); // Đóng modal xác nhận
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <h2 className="subtitle">Movies List</h2>

        {isLoading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>DATE</th>
                <th>TYPE</th>
                <th>NATION</th>
                <th>DIRECTOR</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>
                    <img
                      src={movie.img || "https://placehold.co/50x50"}
                      alt={movie.title}
                      className="thumbnail"
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>
                    {new Date(movie.showDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>{movie.type}</td>
                  <td>{movie.nation}</td>
                  <td>{movie.director}</td>
                  <td>
                    <button
                      className="btn edit"
                      onClick={() => handleEditClick(movie._id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => handleDeleteClick(movie._id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal */}
        {isModalVisible && selectedMovie && (
          <div className="modal-edit">
            <div className="modal-edit-content">
              <h3>Edit Movie</h3>
              <form>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={selectedMovie.title || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Image URL:
                  <input
                    type="text"
                    name="img"
                    value={selectedMovie.img || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Describe:
                  <textarea
                    name="describe"
                    value={selectedMovie.describe || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Link Trailer:
                  <input
                    type="text"
                    name="linkTrailer"
                    value={selectedMovie.linkTrailer || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Show Date:
                  <input
                    type="date"
                    name="showDate"
                    value={selectedMovie.showDate || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Genre:
                  <input
                    type="text"
                    name="genre"
                    value={selectedMovie.genre || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Nation:
                  <input
                    type="text"
                    name="nation"
                    value={selectedMovie.nation || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Director:
                  <input
                    type="text"
                    name="director"
                    value={selectedMovie.director || ""}
                    onChange={handleInputChange}
                  />
                </label>
              </form>
              <button className="btn save" onClick={handleUpdateMovie}>
                Save
              </button>
              <button
                className="btn cancel"
                onClick={() => setIsModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Modal thông báo thành công */}
        {isSuccessModalVisible && (
          <div className="modal-noti">
            <div className="modal-noti-content">
              <h3>Success</h3>
              <p>Movie updated successfully!</p>
              <button
                className="btn-noti-close"
                onClick={() => setIsSuccessModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Modal thông báo thất bại */}
        {isErrorModalVisible && (
          <div className="modal-noti">
            <div className="modal-noti-content">
              <h3>Error</h3>
              <p>Failed to update movie. Please try again.</p>
              <button
                className="btn-noti-close"
                onClick={() => setIsErrorModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Modal Xác Nhận Xóa */}
        {isDeleteModalVisible && selectedMovie && (
          <div className="modal-confirm">
            <div className="modal-confirm-content">
              <h3>Confirm Delete</h3>
              <p>
                Are you sure you want to delete the movie{" "}
                <strong>{selectedMovie.title}</strong>?
              </p>
              <button className="btn confirm" onClick={handleDeleteConfirm}>
                Yes
              </button>
              <button className="btn cancel" onClick={handleDeleteCancel}>
                No
              </button>
            </div>
          </div>
        )}
        {/* Modal thông báo xóa thành công */}
        {isDeleteSuccessModalVisible && (
          <div className="modal-delete">
            <div className="modal-delete-content">
              <h3>Success</h3>
              <p>Movie deleted successfully!</p>
              <button
                className="btn-noti-close"
                onClick={() => setIsDeleteSuccessModalVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MovieList;