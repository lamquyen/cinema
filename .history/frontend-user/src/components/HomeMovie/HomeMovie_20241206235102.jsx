import React, { useRef } from "react";
import "./HomeMovie.css";
import CarouselBanner from "./CarouselBanner";
import banner1 from "../img/LM.png"
import banner2 from "../img/CXBG.png"
import banner3 from "../img/WICKED.png"
import ListMovie from "./ListMovie";
import PromotionalEvent from "./PromotionalEvent";
import BannerEvent from "./BannerEvent";
import QuickBooking from "./QuickBooking";
import Header from '../Header/Header'
import Footer from "../Footer/Footer";


function HomeMovie() {
  const items = [
    {
      image: banner1,
     
    },
    {
      image: banner2,
     
    },
    {
        image: banner3,
    }
  ];
  return (
    <>
    <Header/>
       <div>
      <div style={{ padding: "20px" }}>
      <QuickBooking/>
        <CarouselBanner items={items} />
      </div>
      <ListMovie/>
      <BannerEvent/>
      <PromotionalEvent/>
    </div>
    <Footer/>
    </>
   
  );
}

export default HomeMovie;