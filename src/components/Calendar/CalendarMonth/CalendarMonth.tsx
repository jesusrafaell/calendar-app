import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import CalendarDay from "../CalendarDay";
import { gridTemplateColumns } from "../../../utils/theme/theme";

interface Props {
  month: dayjs.Dayjs[][];
}

const Month: React.FC<Props> = ({ month }) => {
  return (
    <Box
      sx={{
        display: "grid",
        flex: 1,
        gap: "0.5rem",
        width: "100%",
        gridTemplateColumns: gridTemplateColumns.base,
        "@media (max-width: 768px)": {
          gridTemplateColumns: gridTemplateColumns.sm,
        },
      }}
    >
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, index) => (
            <CalendarDay key={index} day={day} />
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Month;
