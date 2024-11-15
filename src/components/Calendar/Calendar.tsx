import React, { useEffect, useState } from "react";
import Month from "./CalendarMonth/CalendarMonth";
import "./calendar.css";
import { getMonth } from "../../utils/getMonth";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import { useCalendarContext } from "../../context/CalendarContext";
import { useMediaQuery } from "@mui/material";
import theme from "../../utils/theme/theme";
import EventModal from "../EventModal/EventModal";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Calendar: React.FC = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex, selectedDay, modalOpen, handleCloseModal } =
    useCalendarContext();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className="calendar-container">
        <CalendarHeader />
        <div className="header-days">
          {daysOfWeek.map((day, index) => (
            <p key={index} className="day-header">
              {isMobile ? day[0] : day}
            </p>
          ))}
        </div>
        <Month month={currenMonth} />
      </div>
      {selectedDay && (
        <EventModal open={modalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Calendar;
