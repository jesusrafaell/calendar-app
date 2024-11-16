import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { IEvent } from "../../../types/events";
import { isCompleted } from "../../../utils/isCompled";

interface CalendarDayContentFullWeekProps {
  dayEvents: IEvent[];
}

const CalendarDayContentFullWeek: React.FC<CalendarDayContentFullWeekProps> = ({
  dayEvents,
}) => {
  const theme = useTheme();

  const sortedEvents = [...dayEvents].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.7rem",
        padding: "0.2rem",
        minHeight: "200px",
        position: "relative",
        overflowY: "auto",
      }}
    >
      {sortedEvents.map((event, idx) => (
        <Box
          key={idx}
          sx={{
            zIndex: 1,
            backgroundColor: isCompleted(event.date)
              ? theme.palette.custom.red200
              : theme.palette.custom.indigo200,
            borderRadius: "0.25rem",
            padding: "0.2rem",
            boxShadow: theme.shadows[1],
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              fontSize: "11px",
              color: theme.palette.text.primary,
            }}
          >
            {event.time} - {event.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CalendarDayContentFullWeek;
