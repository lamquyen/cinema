import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from 'axios';

function ListMovie() {
  const [activeTab, setActiveTab] = useState("dangChieu");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [showingM, setShowingM] = useState([]);


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
    <div className="listMovie">
      <div className="titleM">
        <p class="text-2xl p-2 text-red-600 font-medium text-gray-900 dark:text-white mx-2">
          PHIM
        </p>
        <button
          className={`text-2 p-0.5 font-medium  dark:text-white mx-2 ${
            activeTab === "dangChieu" ? "text-blue-600" : "text-gray-900"
          }`}
          onClick={() => handleTabClick("dangChieu")}
        >
          Đang chiếu
        </button>
        <button
          className={`text-2 p-0.5 font-medium  dark:text-white mx-2 ${
            activeTab === "sapChieu" ? "text-blue-600" : "text-gray-900"
          }`}
          onClick={() => handleTabClick("sapChieu")}
        >
          Sắp chiếu
        </button>
      </div>
      <div className="phimList">
        {activeTab === "dangChieu" && (
          <div className="boxM">
            {showingM.map((phim) => (
              <div 
                key={phim._id}
                className="relative group bg-gray-200 p-5 rounded-lg shadow-lg hover:shadow-xl cardM"
                style={{width:"80%"}}
              >
                <img src={phim.img} className="imgBox"/>
                <p class="text-2 p-1 text-black-600 font-medium text-gray-900 dark:text-white mx-2" >{phim.title}</p>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to={'/DetailMovie'} className="bg-red-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg hover:bg-red-700">
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
                {selectedTrailer === phim._id  && (
                  
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
                key={phim.id}
                className="relative group bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl cardM"
              >
                <p>{phim.ten}</p>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  
                  <button className="bg-blue-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg hover:bg-blue-700">
                    Xem trailer 
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListMovie;
