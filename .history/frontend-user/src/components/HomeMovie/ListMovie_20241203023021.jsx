import React, { useState } from "react";

function ListMovie() {
  const [activeTab, setActiveTab] = useState("dangChieu");
  const [showTrailer, setShowTrailer] = useState(false);

  const trailerUrl = "https://www.youtube.com/watch?v=7oVbS8zQxQ0";

  const showingM = [
    { id: 1, ten: "Phim Đang Chiếu 1" },
    { id: 2, ten: "Phim Đang Chiếu 2" },
    { id: 3, ten: "Phim Đang Chiếu 3" },
    { id: 4, ten: "Phim Đang Chiếu 4" },
    { id: 5, ten: "Phim Đang Chiếu 5" },
    { id: 6, ten: "Phim Đang Chiếu 6" },
  ];

  const upComingM = [
    { id: 1, ten: "Phim Sắp Chiếu 1" },
    { id: 2, ten: "Phim Sắp Chiếu 2" },
    { id: 3, ten: "Phim Sắp Chiếu 3" },
    { id: 4, ten: "Phim Sắp Chiếu 4" },
    { id: 5, ten: "Phim Sắp Chiếu 5" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
                key={phim.id}
                className="relative group bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl cardM"
              >
                <p>{phim.ten}</p>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-red-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg hover:bg-red-700">
                    Đặt vé
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg hover:bg-blue-700"
                          onClick={() => setShowTrailer(!showTrailer)}
                  >
                    {showTrailer ? "Đóng trailer" : "Xem trailer"}
                  </button>
                  {showTrailer && (
        <div className="trailer-container bg-black p-4 rounded-lg">
          <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      )}
                </div>
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
