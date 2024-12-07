import React, { useState } from "react";
import './DetailMovie.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function DetailMovie() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [startIndex, setStartIndex] = useState(0)
  const daysToShow = 5;
  const capitalizeFirstLetter = (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
  };



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

  /* fc mở model trailer*/
  const handelOpenModal = () => {
      setIsModalOpen(true);
  };
  const handelCloseModal = () => {
      setIsModalOpen(false);
  }
  const handleBackdropClick = (e) => {
      // Đóng modal nếu nhấn ra bên ngoài nội dung modal
      if (e.target.id === "modal-backdrop") {
          handelCloseModal();
      }
  };
  return (
    <>
      <Header/>
      <div>
          {/* trailer */}
          <div className="flex justify-center items-center bg-black w-full h-fit relative">
                <img className="w-[50%] h-[50%]" src={Moana} alt="" />
                <a className="absolute self-center    z-10" onClick={(e) => {
                    e.preventDefault();
                    handelOpenModal()
                }}
                    href="https://www.youtube.com/watch?v=hDZ7y8RP5HE"><svg className="w-fit h-36 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path className="w-[40%] " fill-rule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clip-rule="evenodd" />
                    </svg>
                </a>

                <div className="absolute inset-0 bg-gradient-to-tl from-black to-transparent opacity-75"></div>

            </div>
            {isModalOpen && (
                <div
                    id="modal-backdrop"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleBackdropClick}
                >
                    <div className="rounded-lg shadow-lg w-3/5 relative">
                        <div className="self-center">
                            <iframe
                                width="100%"
                                height="600"
                                src="https://www.youtube.com/embed/hDZ7y8RP5HE?autoplay=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
            {/* detail Movie */}
            <div className=" ml-36 mb-14  font-nunito relative   ">
                <div className="flex flex-row gap-5 justify-start w-fit items-end -mt-11 ">
                    <img className="w-[35%] h-[400px] border-white border-[3px] rounded-md z-10 shadow-2xl" src={Moana} alt="" />
                    <div className="  flex flex-col gap-3">
                        <p className="text-3xl font-bold text-[rgb(51_51_51)] ">Hành trình của Moana 2</p>
                        <p className=" flex gap-4 text-gray-700">
                            <span className="flex">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path className="w-[80px] text-yellow-400" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                99 Phút
                            </span>
                            <span className="flex" ><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path className="w-[80px] text-yellow-400" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                            </svg>29/11/2024
                            </span>
                        </p>
                        <p className="flex gap-2 items-center">
                            <span>
                                <svg className="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" viewBox="0 0 24 24">
                                    <path className="w-44 h-44 text-yellow-400" d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                </svg>
                            </span>
                            <span className="text-2xl">8.9</span>
                            <span className="self-end text-gray-500">(217vote)</span>
                        </p>
                        <p className="text-gray-500 text-sm ">Quốc gia: <span>Mỹ</span></p>
                        <p className="text-gray-500 text-sm  ">Nhà sản xuất: <span className="hover:text-orange-500">Walt Disney Pictures</span></p>
                        <p className="text-gray-500 text-sm">Thể loại: <span className="text-black border rounded-md m-2 p-1  hover:border-orange-500">Hoạt Hình</span></p>
                        <p className="text-gray-500 text-sm">Đạo  diễn: <span className="text-black border rounded-md m-2 p-1  hover:border-orange-500">David G. Derrick Jr.</span></p>
                        <p className="text-gray-500 text-sm">Diễn viên: <span className="text-black border rounded-md m-2 p-1  hover:border-orange-500">Tom halland</span></p>

                    </div>
                </div>

                <div className="absolute right-3 top-14 "> <MovieIsShowing /></div>
            </div>

            {/* Nội dung phim */}
            <div className="ml-36 mr-[30%] font-nunito  h-fit">
                <span className="mb-4 text-lg font-bold border-l-4 border-blue-700 pl-2 block">Nội dung phim</span>
                <p className="text-gray-500">“Hành Trình của Moana 2” là màn tái hợp của Moana và Maui sau 3 năm, trở lại trong chuyến phiêu lưu cùng với những thành viên mới. Theo tiếng gọi của tổ tiên, Moana sẽ tham gia cuộc hành trình đến những vùng biển xa xôi của Châu Đại Dương và sẽ đi tới vùng biển nguy hiểm, đã mất tích từ lâu."</p>
            </div>
            {/* fillter lịch chiếu*/}
            <div className="ml-36 mr-[30%] mt-6 mb-10 font-nunito w-fit h-fit">
                <span className="mb-4 text-lg font-bold border-l-4 border-blue-700 pl-2 block">Lịch chiếu</span>
                <div className="flex items-center space-x-4 p-4 bg-white border-b-[2px]   border-b-blue-800 h-fit w-auto">
                    {/* Nút điều hướng */}
                    <div className="flex items-center space-x-4 min-w-fit">
                        <button onClick={handlePrev} className=" py-2 rounded ">❮</button>

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
                    {/* Bộ lọc */}

                    <div className="flex space-x-4">
                        <select className="border rounded px-4 py-2">
                            <option>Toàn quốc</option>
                            <option>Hà Nội</option>
                            <option>Đà Nẳng</option>
                            <option>Hồ Chí Minh</option>
                        </select>
                        <select className="border rounded px-4 py-2">
                            <option>Tất cả rạp</option>
                            <option>rạp A</option>
                            <option>rạp B</option>
                            <option>rạp C</option>
                        </select>
                    </div>

                </div>
                <div className="w-auto py-9 flex-row space-y-5 border-b-[1px]">
                    <p className="font-bold text-lg text-gray-800">Galaxy Nguyễn Du</p>
                    <div className="flex items-center ">
                        <p className="text-gray-700 font-medium w-36 mr-8">2D Lồng Tiếng </p>
                        <button className="border border-gray-400 rounded-md px-4 py-1">20:00</button>
                    </div>
                    <div className="flex items-center ">
                        <p className="text-gray-700 text-[15px] w-36  font-medium mr-8">2D Phụ Đề</p>
                        <button className="border border-gray-400 rounded-md px-4 py-1">21:00</button>
                    </div>


                </div>
            </div>
      </div>
      <Footer/>
    </>
  )
}

export default DetailMovie