import React from "react";

const CinemaInfo = ({ cinema }) => {
  return (
      <div className="titleCinema">
        <div className="col-span-2 ml-[20%]">
          <h1 className="text-2xl font-medium dark:text-white mx-2">
            {cinema.cinemaName}
          </h1>
          <p className="text-sm md:mt-5">
            <span className="text-grey-40">Địa chỉ:</span> {cinema.address}
          </p>
          <p className="text-sm text-blue-10">
            <span className="text-grey-40">Hotline:</span>{" "}
            <a
              className="text-blue-600 transition-all duration-300"
              href="tel:1900 2224"
            >
              1900 2224
            </a>
          </p>
        </div>
      </div>
  );
};

export default CinemaInfo;
