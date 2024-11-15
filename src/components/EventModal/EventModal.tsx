import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Grow,
  styled,
  useMediaQuery,
  useTheme,
  Tooltip,
  Zoom,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useCalendarContext } from "../../context/CalendarContext";
import ListEvent from "./ListEvent";
import AddEvent from "./AddEvent";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const EventModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { selectedDay, getEvents, modalOpen, setSelectedEvent } =
    useCalendarContext();
  const [view, setView] = useState<"list" | "add">("list");
  const [animate, setAnimate] = useState(false);

  const events = selectedDay ? getEvents(selectedDay) : [];

  useEffect(() => {
    setSelectedEvent(null);
    if (events.length) {
      setView("list");
    } else {
      setView("add");
    }
  }, [modalOpen]);

  const handleAddClick = () => {
    if (!events.length) {
      setView("add");
      return;
    }

    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setView("add");
    }, 550);
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
    setView("list");
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Grow in={open} timeout={300}>
        <StyledModalContainer>
          <StyledModalBox isMobile={isMobile}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton
                  onClick={handleBackToList}
                  disabled={view === "list"}
                  style={{
                    opacity: view !== "list" ? 1 : 0,
                    transform: view !== "list" ? "scale(1)" : "scale(0.8)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    marginRight: "6px",
                    cursor: "pointer",
                  }}
                >
                  <ArrowBackIosRoundedIcon
                    sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
                  />
                </IconButton>
                <Typography variant="h6">
                  {selectedDay?.format("DD MMMM, YYYY")}
                </Typography>
                <Fade in={view === "list"} timeout={300}>
                  <Tooltip TransitionComponent={Zoom} title="Add to Calendar">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddClick}
                      sx={{
                        ml: "1rem",
                        minWidth: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        padding: "0.25rem",
                      }}
                    >
                      <AddIcon sx={{ fontSize: "1.2rem" }} />
                    </Button>
                  </Tooltip>
                </Fade>
              </Box>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Container scroll */}
            {view === "list" && <ListEvent events={events} animate={animate} />}
            {view === "add" && <AddEvent onBack={handleBackToList} />}
          </StyledModalBox>
        </StyledModalContainer>
      </Grow>
    </Modal>
  );
};

const StyledModalContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
}));

const StyledModalBox = styled(Box)<{ isMobile: boolean }>(
  ({ theme, isMobile }) => ({
    width: "100%",
    maxWidth: "700px",
    height: isMobile ? "100vh" : "70vh",
    maxHeight: isMobile ? "100vh" : "80vh",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[24],
    padding: "2rem",
  })
);

export default EventModal;
