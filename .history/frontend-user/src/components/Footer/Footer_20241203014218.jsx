import React from 'react'
import "./Footer.css"

function Footer() {
  return (
    <div className='footer'>
        <div className='contentFooter'>
            <div className='card'>
                <p class="text-4x1 p-2 text-white font-medium  dark:text-white "> GIỚI THIỆU</p>
                <a className='herf' href='#'> Về chúng tôi</a>
                <a className='herf' href='#'> Thoả thuận sử dụng</a>
                <a className='herf' href='#'> Quy chế hoạt động</a>
                <a className='herf' href='#'> Chính sách bảo mật</a>
            </div>
            <div className='card'>
                <p class="text-4x1 p-2 text-white font-medium  dark:text-white "> GÓC ĐIỆN ẢNH</p>
                <a className='herf' href='#'> Thể loại phim</a>
                <a className='herf' href='#'> Bình luận phim</a>
                <a className='herf' href='#'> Blog điện ảnh</a>
                <a className='herf' href='#'> Phim hay tháng</a>
            </div>
            <div className='card'>
                <p class="text-4x1 p-2 text-white font-medium  dark:text-white "> HỖ TRỢ</p>
                <a className='herf' href='#'> Góp ý</a>
                <a className='herf' href='#'> Sale & Services</a>
                <a className='herf' href='#'> Rạp / Giá vé</a>
                <a className='herf' href='#'> Tuyển dụng</a>
            </div>
            <div className='card'>
                <p class="text-4x1 p-2 text-white font-medium  dark:text-white "> LIÊN LẠC</p>
                <a className='herf' href='#'> Gmail</a>
                <a className='herf' href='#'> Phone mumber</a>
                <a className='herf' href='#'> Facebook</a>
               
            </div>
        </div>
    </div>
  )
}

export default Footer