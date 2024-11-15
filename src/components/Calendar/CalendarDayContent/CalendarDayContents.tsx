import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IEvent } from "../../../types/events";
import Circle from "@mui/icons-material/Circle";
import { isCompleted } from "../../../utils/isCompled";

interface CalendarDayContentProps {
  dayEvents: IEvent[];
}

const CalendarDayContent: React.FC<CalendarDayContentProps> = ({
  dayEvents,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      {isMobile
        ? dayEvents.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginLeft: "0.25rem",
              }}
            >
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
            </Box>
          )
        : dayEvents.map((event, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              sx={{
                marginBottom: "2.25px",
              }}
            >
              <Circle
                sx={{
                  width: "8px",
                  height: "8px",
                  color: isCompleted(event.date) ? "#8B0000" : "#52b752",
                  marginRight: "2px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {event.title}
              </Typography>
            </Box>
          ))}
    </Box>
  );
};

export default CalendarDayContent;
