import React, { useState, useEffect } from "react";
import SideBar from './SideBar'
import './RevenueAndRoom.css'
import { IoTicketOutline } from "react-icons/io5";
import { LuGlassWater } from "react-icons/lu";
import { LuPopcorn } from "react-icons/lu";
import ShowtimeSelector from "./ShowtimeSelector";
import moment from "moment";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getWeekDays = () => {
  const days = [];
  for (let i = 0; i < 14; i++) {
    const date = moment().add(i, "days");
    days.push({
      day: capitalizeFirstLetter(date.format("dddd")),
      date: date.format("DD/MM"),
      fullDate: date.format("YYYY-MM-DD"),
    });
  }
  return days;
};

function RevenueAndRoom() {
     const [startIndex, setStartIndex] = useState(0);
     const [selectedDate, setSelectedDate] = useState(getWeekDays()[0].fullDate);

    const daysToShow = 7;
    const weekDays = getWeekDays();

    const handleNext = () => {
        if (startIndex + daysToShow < weekDays.length) {
          setStartIndex((prev) => prev + 1);
        }
      };

    const handlePrev = () => {
        if (startIndex > 0) {
          setStartIndex((prev) => prev - 1);
        }
      };
    
    
  return (
    <div className='container'>
        <SideBar/>
        <div className='main'>
            <h2 className="subtitle">Revenue and screening room management</h2>
            <div className='box-container'>
                <div class="dropdown-title">Galaxy Tân Bình</div>
                <div class="content fix-h">
                    <div className='buttonChooseDay'>

                    </div>
                    <ShowtimeSelector
                    weekDays={weekDays}
                    startIndex={startIndex}
                    daysToShow={daysToShow}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                  />
                    <div class="line"></div>
                    <div className='screen hig'>
                        <div className='room w'>
                            <div className='room-number'><h3>Rạp 1</h3></div>
                            <div className='room-number'><h3>Rạp 2</h3></div>
                            <div className='room-number'><h3>Rạp 3</h3></div>
                        </div>
                        <div className='revenue'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Suất Chiếu</th>
                                        <th>Tên Phim</th>
                                        <th>Giờ Chiếu</th>
                                        <th>Vé Bán</th>
                                        <th>SP Bán Kèm</th>
                                        <th>Doanh Thu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9:00 ~ 12:00</td>
                                        <td>Linh Miêu: Quỷ Nhập Tràng</td>
                                    
                                        <td>9:00</td>
                                        <td>5/100</td>
                                        <td>4</td>
                                        <td>1.500.000 đ</td>
                                    </tr>
                                    <tr>
                                        <td>13:00 ~ 16:00</td>
                                        <td>Chị Dâu</td>
                                        <td>13:00</td>
                                        <td>35/100</td>
                                        <td>10</td>
                                        <td>3.000.000 đ</td>
                                    </tr>
                                    <tr>
                                        <td>17:00 ~ 20:00</td>
                                        <td>Chị Dâu</td>
                                        <td>13:00</td>
                                        <td>35/100</td>
                                        <td>30</td>
                                        <td>5.000.000 đ</td>
                                    </tr>
                                    <tr>
                                        <td>21:00 ~ 23:59</td>
                                        <td>Chị Dâu</td>
                                   
                                        <td>13:00</td>
                                        <td>35/100</td>
                                        <td>35</td>
                                        <td>6.000.000 đ</td>
                                    </tr>
                                </tbody>
                            </table>
                           
                        </div>
                        <div className='total-revenue-room'>
                            <div className='room-title'>
                                <h1>Tổng doanh thu rạp <span> 1 </span></h1>
                            </div>
                            <div className='revenue-content'>
                                <h3>Ngày: 2025-01-05</h3>
                                <h3>Loại Rạp: Basic</h3>
                                <span>Vé Bán:</span> <span><IoTicketOutline style={{color:'green'}}/>: 60</span> <span><IoTicketOutline style={{color:'red'}}/>: 30</span> <span><IoTicketOutline style={{color:'purple'}}/>: 10</span>
                                <div className='note'>
                                    <p><IoTicketOutline style={{color:'green'}}/>: Vé thường</p>
                                    <p><IoTicketOutline style={{color:'red'}}/>: Vé Vip</p>
                                    <p><IoTicketOutline style={{color:'purple'}}/>: Vé Couple</p>
                                </div>
                                <h3>Tổng:</h3>
                                <div className='sumPrice'>
                                    <p>20.000.000 đ</p>
                                </div>
                                <span>SP bán kèm:</span> <span><LuGlassWater/>: 5</span> <span><LuPopcorn/>: 7</span> <span>Cb: 8</span>
                                <div className='note'>
                                    <p><LuGlassWater/>: Nước uống</p>
                                    <p><LuPopcorn/>: Bắp Ngọt</p>
                                    <p>Cb: combo bắp & nước</p>
                                </div>
                                <h3>Tổng:</h3>
                                <div className='sumPrice'>
                                    <p>5.000.000 đ</p>
                                </div>
                            </div>
                            <div className='line'></div>
                            <div className='total'>
                                    <h3>25.000.000 đ</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RevenueAndRoom