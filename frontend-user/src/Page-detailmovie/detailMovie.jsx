import React, { useState } from "react";
import "./detailMovie.css"
import Moana from "./Images/moanatrailer.jpg"




const DetailMovie = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
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


        </>
    )


}
export default DetailMovie;