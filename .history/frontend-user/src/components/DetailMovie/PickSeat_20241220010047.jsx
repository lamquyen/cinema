import React, { useEffect, useState } from 'react';
import './DetailMovie.css';
import axios from 'axios';
import Screen from '../img/seatMapHeader.png'



const PickingSeat = () => {
    const [layout, setLayout] = useState();
    useEffect(() => {
        // Gọi API để lấy dữ liệu layout
        axios.get('http://localhost:5000/api/movie/seats')
            .then(response => {
                setLayout(response.data);
            })
            .catch(error => {
                console.error('Error fetching seat layout:', error);
            });
    }, []);
    if (!layout) {
        return <div>Loading...</div>;
    }
    return (
        <div className='font-nunito'>
            <div className="flex items-center mb-12"> <img className="w-fit " src={Screen} alt="" /></div>
            <div className='font-medium flex justify-around mb-10'>
                <p className='flex  items-center'>
                    <span className='border px-2 mr-2'>A1</span> <p>Ghế có thể đặt</p>
                </p>
                <p className='flex  items-center'>
                    <span className='border px-2 mr-2 bg-red-500 text-white'>A1</span> <p>Ghế đã được đặt</p>
                </p>
                <p className='flex  items-center'>
                    <span className='border px-2 mr-2 bg-green-600 text-white'>A1</span> <p>Ghế đang chọn</p>
                </p>
            </div>
            <div>
                {layout.seat.map((row, index) => (
                    <div className='seatLayout' key={index}>
                        <h2>{row.row}</h2>
                        <ul className='flex items-center justify-between gap-2'>
                            {row.seats.map((seat, seatIndex) => (
                                <li className={
                                    `hover:bg-orange-400 py-1 border text-sm w-9 text-center h-auto  ${seat.status === 'sold' ? 'bg-red-500 text-white' : ''}`}
                                    key={seatIndex}>
                                    {seat.number}
                                </li>
                            ))}
                        </ul>
                        <h2>{row.row}</h2>
                    </div>
                ))}
            </div>





        </div>)
}
export default PickingSeat;