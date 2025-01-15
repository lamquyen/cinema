import React from 'react'
import SideBar from './SideBar'
import './RevenueAndRoom.css'
import { IoTicketOutline } from "react-icons/io5";

function RevenueAndRoom() {
  return (
    <div className='container'>
        <SideBar/>
        <div className='main'>
            <h2 className="subtitle">Revenue and screening room management</h2>
            <div className='box-container'>
                <div class="dropdown-title">Galaxy Tân Bình</div>
                <div class="content">
                    <div className='buttonChooseDay'>

                    </div>
                    <div class="line"></div>
                    <div className='screen hig'>
                        <div className='room'>
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
                                        <th>Ngày</th>
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
                                        <td>2025-01-05</td>
                                        <td>9:00</td>
                                        <td>5/100</td>
                                        <td>4</td>
                                        <td>1.500.000 đ</td>
                                    </tr>
                                    <tr>
                                        <td>13:00 ~ 16:00</td>
                                        <td>Chị Dâu</td>
                                        <td>2025-01-05</td>
                                        <td>13:00</td>
                                        <td>35/100</td>
                                        <td>10</td>
                                        <td>10.000.000 đ</td>
                                    </tr>
                                    <tr>
                                        <td>17:00 ~ 20:00</td>
                                        <td>Chị Dâu</td>
                                        <td>2025-01-05</td>
                                        <td>13:00</td>
                                        <td>35/100</td>
                                        <td>30</td>
                                        <td>35.000.000 đ</td>
                                    </tr>
                                    <tr>
                                        <td>21:00 ~ 23:59</td>
                                        <td>Chị Dâu</td>
                                        <td>2025-01-05</td>
                                        <td>13:00</td>
                                        <td>35/100</td>
                                        <td>35</td>
                                        <td>40.000.000 đ</td>
                                    </tr>
                                </tbody>
                            </table>
                           
                        </div>
                        <div className='total-revenue-room'>
                            <div className='room-title'>
                                <h1>Tổng doanh thu rạp <span> 1 </span></h1>
                            </div>
                            <div className='revenue-content'>
                                <h3>Loại Rạp: Basic</h3>
                                <span>Vé Bán:</span> <span><IoTicketOutline style={{color:'green'}}/>: 7</span>
                            </div>
                            <div className='line'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RevenueAndRoom