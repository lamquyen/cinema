import React from 'react'
import SideBar from './SideBar'
import './RevenueAndRoom.css'

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
                            <div className='box-revenue'>
                                <div className='box-revenue-number'>
                                    <p> 1</p>
                                </div>
                                <div className='showtime-box'>
                                    <div className='sh-img'>

                                    </div>
                                   <div className='box-content'>
                                        <h3> Tên Phim:  Linh Miêu: Quỷ Nhập Tràng</h3>
                                        <p>Thời gian: 9:00</p>
                                        <p>Ngày: 2025-01-05</p>
                                        <p>Loại rạp: Basic</p>
                                        <span>Vé bán:</span> <span>5/100</span>
                                   </div>
                                </div>
                                <div className='revenue-room'>
                                        <h2>Doanh Thu</h2>
                                        <p>500.000 đ</p>
                                </div>
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