import React from "react";
import data from "./uudai.json";
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import MovieIsShowing from "../DetailMovie/MovieIsShowing"
const Endows = () => {
    return (
        <>
            <Header />
            <div className=" flex justify-between mx-6 my-8">

                <div className=" w-[65%] font-nunito ">
                    <h1 className="border-l-4 pl-2 border-blue-700 font-semibold text-2xl text-gray-700 mb-5">Danh Sách Ưu Đãi</h1>
                    <div className=" flex flex-wrap justify-around gap-10 w-fit h-fit ">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="w-[250px] h-[350px] flex items-center text-center   relative group"
                            >
                                <img
                                    className=" w-[250px] h-[100%]  oject-cover rounded-lg shadow-md"
                                    src={item.img}
                                    alt={item.description}
                                />
                                <p className=" flex justify-center items-center absolute top-0 w-full h-[100%] rounded-lg
                         bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 
                             text-center  text-lg font-semibold text-white text-wrap  z-10">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <MovieIsShowing />
            </div>
            <Footer />
        </>

    );
};

export default Endows;