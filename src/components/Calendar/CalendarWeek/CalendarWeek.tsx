import React from "react";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useCalendarContext } from "../../../context/CalendarContext";
import CalendarDay from "../CalendarDay";
import { gridTemplateColumns } from "../../../utils/theme/theme";

const Week: React.FC = () => {
  const { selectedDay } = useCalendarContext();

  const getCurrentWeek = (day: dayjs.Dayjs) => {
    const startOfWeek = day.startOf("week");
    return Array.from({ length: 7 }).map((_, index) =>
      startOfWeek.add(index, "day")
    );
  };

  const currentWeek = getCurrentWeek(selectedDay);

  return (
    <Box
      sx={{
        display: "grid",
        marginBottom: "1rem",
        width: "100%",
        marginTop: "0.5rem",
        gap: "0.5rem",
        gridTemplateColumns: gridTemplateColumns.base,
        "@media (max-width: 768px)": {
          gridTemplateColumns: gridTemplateColumns.sm,
        },
      }}
    >
      {currentWeek.map((day, index) => (
        <CalendarDay key={index} day={day} />
      ))}
    </Box>
  );
};

export default Week;
