import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CarouselBanner from "../HomeMovie/CarouselBanner";
import moment from "moment";
import 'moment/locale/vi';
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
/* function hiển thị lịch chiếu*/
    const getWeekDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = moment().add(i, "days");
            days.push({
                day: capitalizeFirstLetter(date.format("dddd")),
                date: date.format("DD/MM"),
                fullDate: date.format("YYYY-MM-DD"),
            });
        }
        return days;
    };

    const weekDays = getWeekDays();
    const handleNext = () => {
        if (startIndex + 2 + daysToShow - 2 < weekDays.length) {
            setStartIndex(startIndex + 2);
        }
    };
    const handlePrev = () => {
        if (startIndex - 2 >= 0) {
            setStartIndex(startIndex - 2);
        }
    };
  return (
    <>
      <Header />
      <div>
        <div style={{ padding: "20px" }}>
          <CarouselBanner items={items} />
        </div>
        <div className="cinemaInfo">
          <div className="titleCinema">
            <div class="col-span-2 ml-[20%]">
              <h1 class="text-2xl  font-medium  dark:text-white mx-2">
                Rạp Hồ Chí Minh
              </h1>
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
          <div className="containerCinema">
            <div className="bg-white p-4">
              <div class="mb-4">
                <span class="border-l-4 border-solid border-blue-600 mr-2"></span>
                <h1 class="text-xl inline-block uppercase font-bold m-0">
                  Phim
                </h1>
              </div>
            </div>
            <div className="buttonChooseDay">
                 {/* Hiển thị các ngày */}
                 <div className="flex overflow-hidden  ">
                                {weekDays.slice(startIndex, startIndex + daysToShow).map((day) => (
                                    <div
                                        key={day.fullDate}
                                        onClick={() => setSelectedDate(day.fullDate)}
                                        className={`text-gray-700 text-base cursor-pointer text-center p-2 rounded transition-colors ${selectedDate === day.fullDate
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <div className="">{day.day}</div>
                                        <div className="">{day.date}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Nút điều hướng */}
                            <button onClick={handleNext} disabled={startIndex + daysToShow >= weekDays.length} className="py-2 rounded ">❯</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cinema;