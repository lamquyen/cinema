import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CarouselBanner from "../HomeMovie/CarouselBanner";
import "./Cinema.css"

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
            <div class="grid lg:grid-cols-3 grid-cols-1  grid-flow-row  gap-y-6  my-0 mx-auto md:items-center screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl md:px-4 sm:px-[45px] px-[16px] py-6"><div class="col-span-2"><h1 class="text-xxl font-bold">Galaxy Tân Bình</h1><p class="text-sm md:mt-5"><span class="text-grey-40">Địa chỉ:</span> 246 Nguyễn Hồng Đào, Q.TB, Tp.HCM </p><p class="text-sm"><span class="text-grey-40">Hotline:</span> <a class="text-blue-10 transition-all duration-300" href="tel:1900 2224">1900 2224</a> </p></div><div class="col-span-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 lg:flex-row gap-4 ml-2 flex-1"><div class="col-span-1"><div><div aria-label="Dropdown select" aria-expanded="false" tabindex="0" direction="ltr" class="react-dropdown-select text-sm css-wfshms e1gzf2xs0" color="#0074D9"><div class="react-dropdown-select-content react-dropdown-select-type-single css-1m5113o e1gn6jc30"><span>TP Hồ Chí Minh</span><input tabindex="-1" class="react-dropdown-select-input css-1q95dnp e11wid6y0" readonly="" placeholder="" value=""></div><div tabindex="-1" class="react-dropdown-select-dropdown-handle css-ago8sv e1vudypg0" rotate="1" color="#0074D9"><svg fill="currentColor" viewBox="0 0 40 40"><path d="M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z"></path></svg></div></div></div></div><div class="col-span-1"><div><div aria-label="Dropdown select" aria-expanded="false" tabindex="0" direction="ltr" class="react-dropdown-select text-sm css-wfshms e1gzf2xs0" color="#0074D9"><div class="react-dropdown-select-content react-dropdown-select-type-single css-1m5113o e1gn6jc30"><span>Galaxy Tân Bình</span><input tabindex="-1" class="react-dropdown-select-input css-1q95dnp e11wid6y0" readonly="" placeholder="" value=""></div><div tabindex="-1" class="react-dropdown-select-dropdown-handle css-ago8sv e1vudypg0" rotate="1" color="#0074D9"><svg fill="currentColor" viewBox="0 0 40 40"><path d="M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z"></path></svg></div></div></div></div></div></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cinema;
