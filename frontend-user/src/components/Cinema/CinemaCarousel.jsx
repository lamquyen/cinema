import React from "react";
import CarouselBanner from "../HomeMovie/CarouselBanner";

const CinemaCarousel = ({ images }) => {
  return (
    <div style={{ padding: "20px" }}>
      <CarouselBanner items={images.map((img) => ({ image: img }))} />
    </div>
  );
};

export default CinemaCarousel;
