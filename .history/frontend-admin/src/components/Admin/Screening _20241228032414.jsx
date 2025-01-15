import React from "react";
import SideBar from "./SideBar";

function Screening() {
  return (
    <div className="container">
      <SideBar />
      <div className="main">
      <div className="movie-title">
          <h2 className="subtitle">Movies List</h2>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            Add Movie
          </button>
        </div>
      </div>
    </div>
  );
}

export default Screening;
