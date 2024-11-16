import React, { useEffect, useState } from "react";
import Month from "./CalendarMonth/CalendarMonth";
import { getMonth } from "../../utils/getMonth";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import { useCalendarContext } from "../../context/CalendarContext";
import { Box, useMediaQuery } from "@mui/material";
import theme, { gridTemplateColumns } from "../../utils/theme/theme";
import Week from "./CalendarWeek/CalendarWeek";
import { ModeCalendar } from "../../types/calendar";
import CalendarDay from "./CalendarDay";
import AddEvent from "../EventModal/AddEvent";
import CustomModal from "../CustomModal";

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

  const { monthIndex, selectedDay, modalOpen, handleCloseModal, mode } =
    useCalendarContext();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const getCalendar = (mode: ModeCalendar) => {
    switch (mode) {
      case "day":
        return <CalendarDay day={selectedDay} />;
      case "week":
        return <Week />;
      default:
        return <Month month={currenMonth} />;
    }
  };

  return (
    <>
      <Box
        sx={{
          // width: "800px",
          // minHeight: "750px",
          minWidth: "370px",
          maxWidth: "800px",
          padding: "1rem",
          marginTop: "2rem",
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CalendarHeader />
        <Box
          sx={{
            display: "grid",
            marginBottom: "1rem",
            width: "100%",
            marginTop: "0.5rem",
            gridTemplateColumns: gridTemplateColumns.base,
            "@media (max-width: 768px)": {
              gridTemplateColumns: gridTemplateColumns.sm,
            },
            gap: "0.5rem",
            opacity: mode === "day" ? 0 : 1,
            pointerEvents: mode === "day" ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          {daysOfWeek.map((day, index) => (
            <Box
              key={index}
              sx={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {isMobile ? day[0] : day}
            </Box>
          ))}
        </Box>
        {getCalendar(mode)}
      </Box>
      {selectedDay && (
        <CustomModal open={modalOpen} onClose={handleCloseModal}>
          <AddEvent />
        </CustomModal>
      )}
    </>
  );
};

export default Calendar;
