import React from "react";

const ShowtimeSelector = ({
  weekDays,
  startIndex,
  daysToShow,
  selectedDate,
  setSelectedDate,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="buttonChooseDay">
      <div className="flex items-center space-x-4 min-w-fit">
        <button onClick={handlePrev} className="py-2 rounded">
          ❮
        </button>
        <div className="flex overflow-hidden">
          {weekDays.slice(startIndex, startIndex + daysToShow).map((day) => (
            <button
              key={day.fullDate}
              onClick={() => setSelectedDate(day.fullDate)}
              className={`text-gray-700 text-base cursor-pointer text-center p-4 rounded transition-colors ${
                selectedDate === day.fullDate
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <div>{day.day}</div>
              <div>{day.date}</div>
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={startIndex + daysToShow >= weekDays.length}
          className="py-2 rounded"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ShowtimeSelector;
