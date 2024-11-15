import React from "react";
import Day from "../CalendarDay/CalendarDays";
import dayjs from "dayjs";
import "./calendarMonth.css";

interface Props {
  month: dayjs.Dayjs[][];
}

const Month: React.FC<Props> = ({ month }) => {
  return (
    <div className="contairner-month">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, index) => (
            <Day key={index} day={day} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
