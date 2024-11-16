import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { IEvent } from "../../../types/events";
import CustomModal from "../../CustomModal";
import ViewEvent from "../../EventModal/ViewEvent";
import CalendarEvent from "./CalendarEvent";

interface CalendarDayContentFullDayProps {
  dayEvents: IEvent[];
}

const CalendarDayContentFullDay: React.FC<CalendarDayContentFullDayProps> = ({
  dayEvents,
}) => {
  const theme = useTheme();

  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i += 2) {
      const hour = i.toString().padStart(2, "0") + ":00";
      hours.push(hour);
    }
    return hours;
  };
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<IEvent | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const baseHours = generateHours();

  const sortedEvents = [...dayEvents].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  const handleClickEvent = (event: IEvent) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const allHours = Array.from(
    new Set([
      ...baseHours,
      ...sortedEvents.reduce((acc, event) => {
        if (!acc.includes(event.time)) {
          acc.push(event.time);
        }
        return acc;
      }, [] as string[]),
    ])
  ).sort((a, b) => a.localeCompare(b));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0.2rem",
          minHeight: "200px",
          position: "relative",
          overflowY: "auto",
        }}
      >
        {allHours.map((hour, index) => {
          const eventsAtHour = sortedEvents.filter((e) => e.time === hour);

          return (
            <Box
              key={index}
              sx={{
                cursor: "pointer",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                marginBottom: eventsAtHour.length ? "0.5rem" : "2rem",
              }}
            >
              {/* Timeline */}
              <Box
                sx={{
                  position: "absolute",
                  left: "2rem",
                  top: "0.6rem",
                  height: "1px",
                  width: "calc(100% - 2rem)",
                  backgroundColor: theme.palette.divider,
                }}
              />

              {/* Hour */}
              <Box
                sx={{
                  position: "absolute",
                  left: "-0.2rem",
                  top: "0.1rem",
                  color: theme.palette.text.secondary,
                  padding: "0 0.2rem",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    paddingRight: "0.5rem",
                    opacity: 0.6,
                  }}
                >
                  {hour}
                </Typography>
              </Box>

              {/* Events */}
              <Box
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  marginLeft: "3rem",
                }}
              >
                {eventsAtHour.map((event, index) => (
                  <CalendarEvent
                    key={index}
                    event={event}
                    handleClickEvent={handleClickEvent}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
      {selectedEvent && (
        <CustomModal open={open} onClose={handleClose}>
          <ViewEvent event={selectedEvent} handleClose={handleClose} />
        </CustomModal>
      )}
    </>
  );
};

export default CalendarDayContentFullDay;
