import React, { useState } from "react";

const MovieSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value); // Gửi dữ liệu tìm kiếm về `Header`
    }
  };

  return (
    <div>
      <input
        className="border-1-red p-1"
        placeholder="Tìm kiếm ..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default MovieSearch;