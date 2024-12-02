import React from "react";
import imgbanner from "../img/ticketbanner.png";
import codeqr from "../img/qrcode.svg"
function BannerEvent() {
  return (
    <div className="bannerM">
      <div className="boxBanner">
        <div className="imgBanner">
          <img src={imgbanner} />
        </div>
        <div className="contentBanner">
          <p class="text-2xl p-2 text-white font-medium  dark:text-white mx-2">
            ĐẶT VÉ ONLINE - KHÔNG LO TRỄ NẢI
          </p>
          <p class="text-l p-2 text-white font-medium  dark:text-white mx-2">
          Ghét đông đúc ồn ào? Lười xếp hàng mua vé? Hãy quên đi cách mua vé giấy truyền thống tốn thời gian hay xếp hàng lấy vé online phiền toái.
          </p>
          <div className="QRcode">
                <img src={codeqr}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerEvent;
