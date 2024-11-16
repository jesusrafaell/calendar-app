import React from "react";
import CalendarDayContentShort from "./CalendarDayContentShort";
import CalendarDayContentFullDay from "./CalendarDayContentFullDay";
import CalendarDayContentFullWeek from "./CalendarDayContentFullWeek";
import { IEvent } from "../../../types/events";
import { ModeCalendar } from "../../../types/calendar";

interface Props {
  dayEvents: IEvent[];
  viewMode: ModeCalendar;
}

const CalendarDayContent: React.FC<Props> = ({ dayEvents, viewMode }) => {
  if (viewMode === "week") {
    return <CalendarDayContentFullWeek dayEvents={dayEvents} />;
  }

  if (viewMode === "day") {
    return <CalendarDayContentFullDay dayEvents={dayEvents} />;
  }

  return <CalendarDayContentShort dayEvents={dayEvents} />;
};

export default CalendarDayContent;
