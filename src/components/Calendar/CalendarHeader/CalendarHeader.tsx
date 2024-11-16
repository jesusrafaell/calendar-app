import React from "react";
import dayjs from "dayjs";
import { useCalendarContext } from "../../../context/CalendarContext";
import {
  IconButton,
  Typography,
  Box,
  Fade,
  Tooltip,
  Zoom,
  useTheme,
} from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { styled, useMediaQuery } from "@mui/system";
import { ModeCalendar } from "../../../types/calendar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomToggleButtonGroup from "./CustomToggleButtonGroup";

const CalendarHeader = () => {
  const {
    monthIndex,
    setMonthIndex,
    selectedDay,
    setSelectedDay,
    mode,
    setMode,
    handleOpenModal,
  } = useCalendarContext();
  const isCurrentMonth = dayjs().month() === monthIndex;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePrev = () => {
    if (mode === "month") {
      const newMonthIndex = monthIndex - 1;
      setMonthIndex(newMonthIndex);

      if (
        dayjs().month() === newMonthIndex &&
        dayjs().year() === dayjs().year()
      ) {
        setSelectedDay(dayjs());
      } else {
        setSelectedDay(dayjs(new Date(dayjs().year(), newMonthIndex, 1)));
      }
    } else if (mode === "week") {
      const newSelectedDay = selectedDay.subtract(1, "week");
      setSelectedDay(newSelectedDay);

      if (newSelectedDay.month() !== monthIndex) {
        setMonthIndex(newSelectedDay.month());
      }
    } else if (mode === "day") {
      const newSelectedDay = selectedDay.subtract(1, "day");
      setSelectedDay(newSelectedDay);

      if (newSelectedDay.month() !== monthIndex) {
        setMonthIndex(newSelectedDay.month());
      }
    }
  };

  const handleNext = () => {
    if (mode === "month") {
      const newMonthIndex = monthIndex + 1;
      setMonthIndex(newMonthIndex);

      if (
        dayjs().month() === newMonthIndex &&
        dayjs().year() === dayjs().year()
      ) {
        setSelectedDay(dayjs());
      } else {
        setSelectedDay(dayjs(new Date(dayjs().year(), newMonthIndex, 1)));
      }
    } else if (mode === "week") {
      const newSelectedDay = selectedDay.add(1, "week");
      setSelectedDay(newSelectedDay);

      if (newSelectedDay.month() !== monthIndex) {
        setMonthIndex(newSelectedDay.month());
      }
    } else if (mode === "day") {
      const newSelectedDay = selectedDay.add(1, "day");
      setSelectedDay(newSelectedDay);

      if (newSelectedDay.month() !== monthIndex) {
        setMonthIndex(newSelectedDay.month());
      }
    }
  };

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: ModeCalendar
  ) => {
    if (newView !== null) {
      setMode(newView);
    }
  };

  const handleAddClick = () => {
    handleOpenModal();
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Box padding="16px">
        <ContainerMonthIndex>
          <StyledIconButton onClick={handlePrev}>
            <ArrowBackIosRoundedIcon
              sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
            />
          </StyledIconButton>
          <StyledTypography variant="h6" isCurrentMonth={isCurrentMonth}>
            {mode === "month" &&
              dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM, YYYY")}
            {mode === "week" &&
              `${selectedDay.startOf("week").format("DD MMM")} - ${selectedDay
                .endOf("week")
                .format("DD MMM, YYYY")}`}
            {mode === "day" && selectedDay.format("DD MMM, YYYY")}
          </StyledTypography>
          <StyledIconButton onClick={handleNext}>
            <ArrowForwardIosRoundedIcon
              sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
            />
          </StyledIconButton>
        </ContainerMonthIndex>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        sx={{
          flexDirection: isSmallScreen ? "column-reverse" : "row",
        }}
      >
        <Fade in={mode === "day"} timeout={200}>
          <Tooltip TransitionComponent={Zoom} title="Add Event">
            <IconButton onClick={handleAddClick}>
              <AddCircleIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </Fade>
        <CustomToggleButtonGroup
          mode={mode}
          handleViewChange={handleViewChange}
        />
      </Box>
    </Box>
  );
};

const ContainerMonthIndex = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "250px",
  maxWidth: "100%",
  [theme.breakpoints.down("md")]: {
    width: "180px",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "8px",
  [theme.breakpoints.down("md")]: {
    padding: "4px",
  },
}));

const StyledTypography = styled(Typography)<{ isCurrentMonth: boolean }>(
  ({ theme, isCurrentMonth }) => ({
    fontWeight: "bold",
    marginLeft: "3px",
    marginRight: "3px",
    fontSize: "1rem",
    color: isCurrentMonth
      ? theme.palette.text.primary
      : theme.palette.text.secondary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  })
);

export default CalendarHeader;
