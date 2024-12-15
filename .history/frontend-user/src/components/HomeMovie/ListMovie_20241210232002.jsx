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
                key={phim._id}
                className="relative group bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl cardM"
                style={{width:"80%"}}
              >
               <img src={phim.img} className="imgBox"/>
               <p class="text-2 p-1 text-black-600 font-medium text-gray-900 dark:text-white mx-2" >{phim.title}</p>
               <div className="votes">
               <span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star text-yellow-300 ml-3 w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path></svg></span><span class="text-[18px] font-bold text-white ml-5">{phim.rating}</span>
               </div>
               <div class="age__limit absolute bottom-[6px] right-[6px]"><span class="inline-flex items-center justify-center w-[38px] h-7 bg-primary rounded text-sm text-center text-white font-bold not-italic">T13</span></div>
               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to={`/DetailMovie/${phim._id}`}  className="bg-red-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg hover:bg-red-700">
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
      </div>
    </div>
  );
}

export default ListMovie;
