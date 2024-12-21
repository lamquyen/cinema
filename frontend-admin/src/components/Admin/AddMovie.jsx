import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "./Admin.css";

const AddMovie = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // Trạng thái Modal thông báo
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false); // Modal thông báo thất bại
  const [newMovie, setNewMovie] = useState({
    title: "",
    img: "",
    img02: "",
    describe: "",
    linkTrailer: "",
    showDate: "",
    genre: "",
    cast: "",
    rating: "",
    type: "",
    times: "",
    nation: "",
    director: "",
    manufacturer: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleAddMovie = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/movie/",
        newMovie
      );
      setMovies([...movies, response.data]); // Thêm phim mới vào danh sách
      setShowModal(false); // Ẩn modal
      setNewMovie({
        title: "",
        img: "",
        img02: "",
        describe: "",
        linkTrailer: "",
        showDate: "",
        genre: "",
        cast: "",
        rating: "",
        type: "",
        times: "",
        nation: "",
        director: "",
        manufacturer: "",
      });
      setIsSuccessModalVisible(true); // Hiển thị modal thông báo
      setTimeout(() => setIsSuccessModalVisible(false), 3000); // Tự động đóng sau 3 giây
    } catch (error) {
      setIsErrorModalVisible(true); // Hiển thị modal thất bại
      setTimeout(() => setIsErrorModalVisible(false), 3000); // Tự động đóng modal
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Movie</h3>
            <form>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={newMovie.title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="img"
                  value={newMovie.img}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Image 02 URL:
                <input
                  type="text"
                  name="img02"
                  value={newMovie.img02}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Describe:
                <input
                  type="text"
                  name="describe"
                  value={newMovie.describe}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Link Trailer:
                <input
                  type="text"
                  name="linkTrailer"
                  value={newMovie.linkTrailer}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Show Date:
                <input
                  type="date"
                  name="showDate"
                  value={newMovie.showDate}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Genre:
                <input
                  type="text"
                  name="genre"
                  value={newMovie.genre}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Cast:
                <input
                  type="text"
                  name="cast"
                  value={newMovie.cast}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Rating:
                <input
                  type="number"
                  name="rating"
                  value={newMovie.rating}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  name="type"
                  value={newMovie.type}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Times:
                <input
                  type="number"
                  name="times"
                  value={newMovie.times}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Nation:
                <input
                  type="text"
                  name="nation"
                  value={newMovie.nation}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Director:
                <input
                  type="text"
                  name="director"
                  value={newMovie.director}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Manufacturer:
                <input
                  type="text"
                  name="manufacturer"
                  value={newMovie.manufacturer}
                  onChange={handleInputChange}
                />
              </label>
            </form>
            <button className="btn save" onClick={handleAddMovie}>
              Save
            </button>
            <button className="btn cancel" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
        {/* Modal thông báo thành công */}
        {isSuccessModalVisible && (
          <div className="modal-noti">
            <div className="modal-noti-content">
              <h3>Success</h3>
              <p>Movie added successfully!</p>
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
              <p>Failed to add movie. Please try again.</p>
              <button
                className="btn-noti-close"
                onClick={() => setIsErrorModalVisible(false)}
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

export default AddMovie;
