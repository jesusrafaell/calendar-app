import React from "react";
import { Box, styled, Typography } from "@mui/material";
import CardEvent from "./CardEvent";
import { IEvent } from "../../types/events";

interface ListEventProps {
  events: IEvent[];
  animate?: boolean;
}

const ListEvent: React.FC<ListEventProps> = ({ events, animate = false }) => (
  <StyledEventsContainer>
    {events.length === 0 ? (
      <Typography variant="body2">No events for this day.</Typography>
    ) : (
      events.map((event, index) => (
        <StyledCardEventWrapper
          key={index}
          animate={animate}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <CardEvent event={event} />
        </StyledCardEventWrapper>
      ))
    )}
  </StyledEventsContainer>
);

const StyledEventsContainer = styled(Box)(() => ({
  maxHeight: "60vh",
  overflowY: "auto",
  overflowX: "hidden",
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
  padding: "1rem 2rem",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const StyledCardEventWrapper = styled(Box)<{ animate: boolean }>(
  ({ animate }) => ({
    opacity: animate ? 0 : 1,
    transform: animate ? "translateY(20px)" : "translateY(0)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  })
);

export default ListEvent;
