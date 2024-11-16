import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useCalendarContext } from "../../context/CalendarContext";
import { IEvent } from "../../types/events";
import CalendarDayContent from "./CalendarDayContent/CalendarDayContents";

interface Props {
  day: dayjs.Dayjs;
}

const CalendarDay: React.FC<Props> = ({ day }) => {
  const theme = useTheme();
  const {
    monthIndex,
    filteredMonthEvents,
    setSelectedDay,
    handleShowDay,
    mode: viewMode,
  } = useCalendarContext();
  const [dayEvents, setDayEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const getDayEvents = () => {
      return filteredMonthEvents.filter((event) =>
        dayjs(event.date).isSame(day, "day")
      );
    };
    setDayEvents(getDayEvents());
  }, [day, filteredMonthEvents]);

  const handleClick = () => {
    if (viewMode !== "day") {
      handleShowDay(day);
    }
    setSelectedDay(day);
  };

  const isCurrentDay = day.isSame(dayjs(), "day");
  const isInactiveDay = !day.isSame(dayjs().month(monthIndex), "month");

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: viewMode !== "day" ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "8px",
        padding: viewMode !== "day" ? "0.3rem" : "1rem",
        maxWidth: "100%",
        transition: "all 0.2s ease-in-out",
        backgroundColor: isInactiveDay
          ? theme.palette.grey[200]
          : theme.palette.background.paper,
        "&:hover": {
          backgroundColor: viewMode != "day" ? theme.palette.action.hover : "",
        },
      }}
    >
      {/* Header */}
      {viewMode !== "day" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.25rem",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              fontSize: "0.875rem",
              color: isInactiveDay
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
              bgcolor: isCurrentDay
                ? theme.palette.primary.main
                : "transparent",
              borderRadius: "50%",
              padding: isCurrentDay ? "0.2rem" : "0",
              textAlign: "center",
            }}
          >
            {day.format("DD")}
          </Typography>
        </Box>
      )}

      <CalendarDayContent dayEvents={dayEvents} viewMode={viewMode} />
    </Box>
  );
};

export default CalendarDay;
