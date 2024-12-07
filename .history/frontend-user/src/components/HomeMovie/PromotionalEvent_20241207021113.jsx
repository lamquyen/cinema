import React from "react";
import CarouselEvent from "./CarouselEvent";
import banner1 from "../img/LM.png"
import banner2 from "../img/CXBG.png"
import banner3 from "../img/WICKED.png"

function PromotionalEvent() {
    const items = [
        {
          image: banner1,
          title:"banner1"
         
        },
        {
          image: banner2,
           title:"banner2 aaaaaaaaaa"
         
        },
        {
            image: banner3,
             title:"banner3"
        },
        {
            image: banner3,
             title:"banner4"
        }
      ];
  return (
    <div className="listEvent">
      <div className="titleM">
        <p class="text-2xl p-2 text-red-600 font-medium text-gray-900 dark:text-white mx-2">
          TIN KHUYẾN MÃI
        </p>
      </div>
      <div  style={{marginTop:"30px"}}>
            <CarouselEvent items={items}/>
        </div>
    </div>
  );
}

export default PromotionalEvent;