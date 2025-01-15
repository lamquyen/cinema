import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CarouselBanner({ items }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0",
    width: '1200px',
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="carousel-slide">
            <img src={item.image} alt={item.title} className="carousel-image h-[450px] w-[800px] px-2 pt-1" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselBanner