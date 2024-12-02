import React from 'react'
import Slider from "react-slick";

function CarouselEvent({items}) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        centerMode: true,
        centerPadding: "10",
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
                <img src={item.image} alt={item.title} className="carousel-image" style={{padding:"10px", height:"250px"}}/>
                <p className='tieleEv'>{item.title}</p>
              </div>
            ))}
          </Slider>
        </div>
  )
}

export default CarouselEvent