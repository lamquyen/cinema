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
                </div>
            </div>
        </div>
    </div>
  )
}

export default RevenueAndRoom