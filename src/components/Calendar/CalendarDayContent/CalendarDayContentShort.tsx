import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IEvent } from "../../../types/events";
import { isCompleted } from "../../../utils/isCompled";
import { Circle } from "@mui/icons-material";

interface CalendarDayContentShortProps {
  dayEvents: IEvent[];
}

const CalendarDayContentShort: React.FC<CalendarDayContentShortProps> = ({
  dayEvents,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sortedEvents = [...dayEvents].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  const getStatusColor = () => {
    const allCompleted = dayEvents.every((event) => isCompleted(event.date));
    const anyUpcoming = dayEvents.some((event) => !isCompleted(event.date));

    if (allCompleted) {
      return "#8B0000";
    } else if (anyUpcoming) {
      return "#52b752";
    }
    return "#8B0000";
  };

  const upcomingEventsCount = dayEvents.filter(
    (event) => !isCompleted(event.date)
  ).length;

  return (
    <Box
      sx={{
        height: isMobile ? "1rem" : "5rem",
        display: "flex",
        cursor: "pointer",
        paddingTop: "0.25rem",
        paddingLeft: "0.2rem",
        paddingRight: "0.2rem",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {isMobile ? (
        <>
          <Circle
            sx={{
              width: "8px",
              height: "8px",
              color: getStatusColor(),
              marginRight: "4px",
            }}
          />
          {upcomingEventsCount > 0 && (
            <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>
              +{upcomingEventsCount}
            </Typography>
          )}
        </>
      ) : (
        sortedEvents.map((event, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            sx={{
              marginBottom: "3.5px",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                bgcolor: isCompleted(event.date)
                  ? theme.palette.custom.red200
                  : theme.palette.custom.indigo200,
                fontSize: "0.7rem",
                borderRadius: "0.2rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {event.title}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default CalendarDayContentShort;
