import axios from "axios";
import React, { useState, useEffect } from "react";


const Transaction = () => {

    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const userData = localStorage.getItem('loggedInUser')
    const user = JSON.parse(userData);
    const userId = user._id;
    console.log('day a user', userId)
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const userData = localStorage.getItem('loggedInUser')
                const user = JSON.parse(userData);
                const userId = user._id;
                console.log('day a user', userId)
                const response = await axios.get(`http://localhost:5000/api/users/transaction-history`, { params: { userId, page: currentPage } })
                setBookings(response.data.bookings);
                setTotalPages(response.data.totalPages);
            } catch {
                console.log('error feching bookings')

            }
        }
        fetchBooking();
    }, [userId, currentPage])
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <>
            <div className="my-10 mx-9">



                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs  uppercase bg-gray-500  text-white">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Phim
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Mã lấy vé
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Thông tin vé
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tổng tiền
                                </th>

                            </tr>
                        </thead>
                        <tbody >
                            {bookings.length > 0 ? (
                                bookings.map((booking, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white  even:bg-gray-300 text-black  "
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {booking.showtime?.movieTitle || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">{booking.ticketCode}</td>
                                        <td className="px-6 py-4">
                                            {`Ghế: ${booking.seats} | Suất chiếu: ${booking.showtime?.time || 'N/A'} | Ngày: ${booking.showtime?.day || 'N/A'}`}
                                        </td>
                                        <td className="px-6 py-4">{booking.totalPrice} VNĐ</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center">
                                        Không có giao dịch nào
                                    </td>
                                </tr>
                            )}
                            <div className=" my-4 flex justify-center items-center">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-6 py-2 mx-2 text-white  rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                                    </svg>

                                </button>
                                <span className=" py-2 text-gray-700 font-semibold">
                                    {`Trang ${currentPage} / ${totalPages}`}
                                </span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-6 py-2 mx-2 text-white  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                                    </svg>

                                </button>
                            </div>
                        </tbody>
                    </table>
                </div>





            </div>

        </>
    )
}
export default Transaction