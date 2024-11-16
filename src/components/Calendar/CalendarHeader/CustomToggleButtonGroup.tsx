import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ModeCalendar } from "../../../types/calendar";

interface Props {
  mode: string;
  handleViewChange: (
    event: React.MouseEvent<HTMLElement>,
    newMode: ModeCalendar
  ) => void;
}

const CustomToggleButtonGroup: React.FC<Props> = ({
  mode,
  handleViewChange,
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleViewChange}
      aria-label="View Switcher"
      color="primary"
    >
      <ToggleButton value="month" aria-label="Month View">
        <CalendarMonthIcon
          sx={{
            fontSize: isSmallScreen ? "1rem" : "1.5rem",
            marginRight: isLargeScreen ? "0.5rem" : "0",
          }}
        />
        {isLargeScreen && (
          <Typography
            variant="body2"
            sx={{
              fontSize: isSmallScreen ? "0.75rem" : "1rem",
              textTransform: "capitalize",
            }}
          >
            Month
          </Typography>
        )}
      </ToggleButton>

      <ToggleButton value="week" aria-label="Week View">
        <CalendarViewWeekIcon
          sx={{
            fontSize: isSmallScreen ? "1rem" : "1.5rem",
            marginRight: isLargeScreen ? "0.5rem" : "0",
          }}
        />
        {isLargeScreen && (
          <Typography
            variant="body2"
            sx={{
              fontSize: isSmallScreen ? "0.75rem" : "1rem",
              textTransform: "capitalize",
            }}
          >
            Week
          </Typography>
        )}
      </ToggleButton>

      <ToggleButton value="day" aria-label="Day View">
        <CalendarTodayIcon
          sx={{
            fontSize: isSmallScreen ? "1rem" : "1.5rem",
            marginRight: isLargeScreen ? "0.5rem" : "0",
          }}
        />
        {isLargeScreen && (
          <Typography
            variant="body2"
            sx={{
              fontSize: isSmallScreen ? "0.75rem" : "1rem",
              textTransform: "capitalize",
            }}
          >
            Day
          </Typography>
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default CustomToggleButtonGroup;
