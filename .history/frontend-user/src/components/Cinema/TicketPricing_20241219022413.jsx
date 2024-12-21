import React from "react";

const TicketPricing = ({ image }) => {
  return (
    <div className="bg-white p-4">
      <div className="mb-4">
        <span className="border-l-4 border-solid border-blue-600 mr-2"></span>
        <h1 className="text-xl inline-block uppercase font-bold m-0">
          Giá Vé
        </h1>
      </div>
      <ul className="cinemaTicketsPricing">
        <li className="mb-4 text-center">
          <img
            className="inline object-cover"
            src={image}
            alt="Ticket Pricing"
          />
        </li>
      </ul>
    </div>
  );
};

export default TicketPricing;
