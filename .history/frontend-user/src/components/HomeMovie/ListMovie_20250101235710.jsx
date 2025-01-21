import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from 'axios';

function ListMovie() {
  const [activeTab, setActiveTab] = useState("dangChieu");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [showingM, setShowingM] = useState([]);
  const [upComingM, setUpComingM] = useState([]);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies/released');  // URL API của bạn
        setShowingM(response.data);  // Lưu danh sách phim vào state
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);


  useEffect(() => {
    const fetchMovies0 = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies/not_released');  // URL API của bạn
        setUpComingM(response.data);  // Lưu danh sách phim vào state
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies0();
  }, []);







  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBackdropClick = (e) => {
    // Đóng modal nếu nhấn ra bên ngoài nội dung modal
    if (e.target.id === "modal-backdrop") {
      setSelectedTrailer(null);
    }
  };
  return (
    <div className="listMovie px-[10%] py-10 ">
      <div className="titleM font-nunito border-l-4 border-blue-600">
        <p class="text-2xl p-2  font-medium text-gray-900  mx-2">
          PHIM
        </p>
        <button
          className={`text-2 p-0.5 font-medium   mx-2 ${activeTab === "dangChieu" ? "text-blue-600" : "text-gray-900"
            }`}
          onClick={() => handleTabClick("dangChieu")}
        >
          Đang chiếu
        </button>
        <button
          className={`text-2 p-0.5 font-medium   mx-2 ${activeTab === "sapChieu" ? "text-blue-600" : "text-gray-900"
            }`}
          onClick={() => handleTabClick("sapChieu")}
        >
          Sắp chiếu
        </button>
      </div>
      <div className="phimList">
        {activeTab === "dangChieu" && (
          <div className="boxM ">
            {showingM.map((phim) => (
              <div
                key={phim._id}
                className="relative group border-none rounded-lg   shadow-lg hover:shadow-xl h-max w-fit cardM"

              >
                <img src={phim.img} className="h-96 w-72 border-none rounded-lg " />
                <p class="text-2 p-1 text-black-600  mb-3 font-medium text-gray-900 " >{phim.title}</p>

                <div className="border-none rounded-lg text-lg font-nunito absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to={`/DetailMovie/${phim._id}`} className="bg-red-600 text-white px-4 py-1 m-2 rounded-md shadow-lg hover:bg-red-700">
                    Đặt vé
                  </Link>
                  <button
                    className="bg-blue-600 text-white px-4 py-1 m-2 rounded-md shadow-lg hover:bg-blue-700"
                    onClick={() =>

                      setSelectedTrailer(selectedTrailer === phim._id ? null : phim._id)

                    }
                  >
                    Xem trailer
                  </button>
                </div>
                {selectedTrailer === phim._id && (

                  <div
                    id="modal-backdrop"
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"

                    onClick={handleBackdropClick}
                  >
                    <div className="rounded-lg shadow-lg w-3/5 relative">
                      <div className="self-center">
                        <iframe
                          width="100%"
                          height="600"
                          src={phim.linkTrailer}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        )}
        {activeTab === "sapChieu" && (
          <div className="boxM">
            {upComingM.map((phim) => (
              <div
                key={phim._id}
                className="relative group bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl cardM"
                style={{ width: "80%" }}
              >
                <img src={phim.img} className="imgBox" />
                <p class="text-2 p-1 text-black-600 font-medium text-gray-900 dark:text-white mx-2 mb-3" >{phim.title}</p>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to={`/DetailMovie/${phim._id}`} className="bg-red-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg hover:bg-red-700">
                    Đặt vé
                  </Link>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg hover:bg-blue-700"
                    onClick={() =>

                      setSelectedTrailer(selectedTrailer === phim._id ? null : phim._id)

                    }
                  >
                    Xem trailer
                  </button>
                </div>
                {selectedTrailer === phim._id && (

                  <div
                    id="modal-backdrop"
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"

                    onClick={handleBackdropClick}
                  >
                    <div className="rounded-lg shadow-lg w-3/5 relative">
                      <div className="self-center">
                        <iframe
                          width="100%"
                          height="600"
                          src={phim.linkTrailer}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListMovie;
