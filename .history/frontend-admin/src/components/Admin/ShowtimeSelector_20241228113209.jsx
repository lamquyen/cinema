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
    <div className="button-choose-day">
      <div className="container">
        <button onClick={handlePrev} className="nav-button">
          ❮
        </button>
        <div className="days-container">
          {weekDays.slice(startIndex, startIndex + daysToShow).map((day) => (
            <button
              key={day.fullDate}
              onClick={() => setSelectedDate(day.fullDate)}
              className={`day-button ${
                selectedDate === day.fullDate ? "active" : ""
              }`}
            >
              <div className="day">{day.day}</div>
              <div className="date">{day.date}</div>
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={startIndex + daysToShow >= weekDays.length}
          className="nav-button"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ShowtimeSelector;