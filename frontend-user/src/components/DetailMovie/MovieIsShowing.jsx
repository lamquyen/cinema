import React from "react";
import Moana from "../img/moanatrailer.png"
const MovieIsShowing = () => {
    return (
        <div className="font-nunito grid items-end space-y-5 w-fit  h-fit   ">
            <p className="border-l-4 border-blue-900 pl-2 font-semibold text-xl text-gray-700 w-fit ">PHIM ĐANG CHIẾU</p>
            <div className="w-auto">
                <img className="w-80" src={Moana} alt="" />
                <p className="text-base font-semibold text-gray-700 mt-3 w-fit">Hành trình của Moana 2</p>
            </div>
            <div className="w-auto">
                <img className="w-96" src={Moana} alt="" />
                <p className="text-base font-semibold text-gray-700 mt-3 w-fit">Hành trình của Moana 2</p>
            </div>
            <div className="w-auto">
                <img className="w-96" src={Moana} alt="" />
                <p className="text-base font-semibold text-gray-700 mt-3 w-fit">Hành trình của Moana 2</p>
            </div>
            <button className="text-orange-600 text-sm rounded-md py-2 px-8 border border-orange-600 w-fit">Xem Thêm ❯</button>
        </div>
    )



}
export default MovieIsShowing;