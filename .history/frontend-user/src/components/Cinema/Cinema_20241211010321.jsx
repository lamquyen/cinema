import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CarouselBanner from "../HomeMovie/CarouselBanner";
import "./Cinema.css";

function Cinema() {
  const items = [
    {
      image:
        "https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-tan-binh-1_1557134148145.jpg",
    },
    {
      image: "https://cdn.galaxycine.vn/media/2023/11/22/1_1700639852832.jpg",
    },
    {
      image:
        "https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-tan-binh-3_1557133920863.jpg",
    },
  ];
  return (
    <>
      <Header />
      <div>
        <div style={{ padding: "20px" }}>
          <CarouselBanner items={items} />
        </div>
        <div className="cinemaInfo">
          <div className="grid lg:grid-cols-3 grid-cols-1  grid-flow-row  gap-y-6  my-0 mx-auto md:items-center ml-[20%] mr-[20%] bg-white  md:px-4 sm:px-[45px] px-[16px] py-6  w-full">
            <div class="col-span-2">
              <h1 class="text-2xl  font-medium  dark:text-white mx-2">Rạp HCM</h1>
              <p class="text-sm md:mt-5">
                <span class="text-grey-40">Địa chỉ:</span> 246 Nguyễn Hồng Đào,
                Q.TB, Tp.HCM{" "}
              </p>
              <p class="text-sm text-blue-10">
                <span class="text-grey-40">Hotline:</span>{" "}
                <a
                  class="text-blue-600 transition-all duration-300"
                  href="tel:1900 2224"
                >
                  1900 2224
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cinema;
