import React from "react";
import { Box, styled, Typography, useTheme, Zoom } from "@mui/material";
import { IEvent } from "../../../types/events";
import { isCompleted } from "../../../utils/isCompled";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { truncateText } from "../../../utils/truncateText";

interface CalendarDayContentFullDayProps {
  event: IEvent;
  handleClickEvent: (event: IEvent) => void;
}

const CalendarEvent: React.FC<CalendarDayContentFullDayProps> = ({
  event,
  handleClickEvent,
}) => {
  const theme = useTheme();

  const [hover, setHover] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => {
    setHover(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const offsetX = (x / rect.width - 0.5) * 10;
    const offsetY = (y / rect.height - 0.5) * 5;
    setMousePos({ x: offsetX, y: offsetY });
  };

  return (
    <LightTooltip
      title={truncateText(event.description, 100)}
      TransitionComponent={Zoom}
      placement="top"
    >
      <Box
        onClick={() => handleClickEvent(event)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        sx={{
          zIndex: 1,
          backgroundColor: isCompleted(event.date)
            ? theme.palette.custom.red200
            : theme.palette.custom.indigo200,
          borderRadius: "0.25rem",
          padding: "0.2rem",
          // boxShadow: theme.shadows[1],
          // maxWidth: "70%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          cursor: "pointer",
          boxShadow: hover
            ? "0 8px 20px rgba(0, 0, 0, 0.2)"
            : "0 2px 10px rgba(0, 0, 0, 0.1)",
          transform: hover ? `translate(${mousePos.x}px, ${mousePos.y}px)` : "",
          // transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            color: theme.palette.text.primary,
          }}
        >
          {event.title}
        </Typography>
      </Box>
    </LightTooltip>
  );
};

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
    fontWeight: "Bold",
  },
}));

export default CalendarEvent;
