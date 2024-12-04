import React, { useState } from "react";

function ListMovie() {
  const [activeTab, setActiveTab] = useState("dangChieu");
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  

  const showingM = [
    {
      id: 1,
      ten: "Phim A",
      trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      ten: "Phim B",
      trailer: "https://www.youtube.com/embed/oHg5SJYRHA0",
    },
    {
      id: 3,
      ten: "Phim C",
      trailer: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    },
    {
      id: 4,
      ten: "Phim D",
      trailer: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    },
    {
      id: 5,
      ten: "Phim E",
      trailer: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    },
    {
      id: 6,
      ten: "Phim F",
      trailer: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    },
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
                  <button className="bg-blue-600 text-white px-4 py-2 m-2 rounded-lg shadow-lg hover:bg-blue-700">
                    Xem trailer
                  </button>
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
                {selectedTrailer === phim.id && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4 bg-white rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      className="w-full h-full"
                      src={phim.trailer}
                      title={`Trailer của ${phim.ten}`}
                      allow="autoplay; encrypted-media"
                      frameBorder="0"
                    ></iframe>
                    <button
                      className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full shadow hover:bg-red-700"
                      onClick={() => setSelectedTrailer(null)}
                    >
                      Đóng
                    </button>
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
