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
      <div className="flex">
        <button onClick={handlePrev}>
          ❮
        </button>
        <div className="overflow-hidden">
          {weekDays.slice(startIndex, startIndex + daysToShow).map((day) => (
            <button
              key={day.fullDate}
              onClick={() => setSelectedDate(day.fullDate)}
              className={`${
                selectedDate === day.fullDate ? "selected" : ""
              }`}
            >
              <div className="day">{day.day}</div>
              <div className="date">{day.date}</div>
            </button>
          ))}
        </div>
        <button onClick={handleNext} disabled={startIndex + daysToShow >= weekDays.length}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default ShowtimeSelector;