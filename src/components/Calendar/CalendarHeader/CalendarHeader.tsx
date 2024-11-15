import dayjs from "dayjs";
import { useCalendarContext } from "../../../context/CalendarContext";
import { IconButton, Typography, Box } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { styled } from "@mui/system";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useCalendarContext();
  const isCurrentMonth = dayjs().month() === monthIndex;

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <Box padding="16px">
      <ContainerMonthIndex>
        <StyledIconButton onClick={handlePrevMonth}>
          <ArrowBackIosRoundedIcon
            sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
          />
        </StyledIconButton>
        <StyledTypography variant="h6" isCurrentMonth={isCurrentMonth}>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM, YYYY")}
        </StyledTypography>
        <StyledIconButton onClick={handleNextMonth}>
          <ArrowForwardIosRoundedIcon
            sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
          />
        </StyledIconButton>
      </ContainerMonthIndex>
    </Box>
  );
};

const ContainerMonthIndex = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "220px",
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
