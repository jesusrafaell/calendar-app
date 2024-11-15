import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "./calendarDay.css";
import { useCalendarContext } from "../../../context/CalendarContext";
import { IEvent } from "../../../types/events";
import CalendarDayContent from "../CalendarDayContent/CalendarDayContents";

interface Props {
  day: dayjs.Dayjs;
  rowIdx: number;
}

const CalendarDay: React.FC<Props> = ({ day }) => {
  const { monthIndex, filteredMonthEvents } = useCalendarContext();
  const [dayEvents, setDayEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const getDayEvents = () => {
      return filteredMonthEvents.filter((event) =>
        dayjs(event.date).isSame(day, "day")
      );
    };
    setDayEvents(getDayEvents());
  }, [day, filteredMonthEvents]);

  function getInactiveDayClass() {
    return !day.isSame(dayjs().month(monthIndex), "month")
      ? "inactive-day"
      : "";
  }

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "current-day"
      : "";
  }

  function getEventsClass() {
    return dayEvents.length > 0 ? "calendar-day-events" : "";
  }

  return (
    <div className={`calendar-day ${getInactiveDayClass()}`}>
      <div className={`calendar-day-header ${getEventsClass()}`}>
        <p className={`calendar-day-number ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </div>
      <CalendarDayContent dayEvents={dayEvents} />
    </div>
  );
};

export default CalendarDay;
