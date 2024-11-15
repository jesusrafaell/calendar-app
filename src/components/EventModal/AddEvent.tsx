import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Fade,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { IEvent } from "../../types/events";
import { useCalendarContext } from "../../context/CalendarContext";

interface AddEventProps {
  onBack: () => void;
}

const AddEvent: React.FC<AddEventProps> = ({ onBack }) => {
  const { selectedDay, addEvent } = useCalendarContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState(dayjs().format("HH:mm"));
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (selectedDay) {
      setDate(selectedDay.format("YYYY-MM-DD"));
    }
  }, [selectedDay]);

  const handleSave = () => {
    const eventDateTime = dayjs(`${date}T${time}`, "YYYY-MM-DDTHH:mm", true);
    const newEvent: IEvent = {
      id: crypto.randomUUID(),
      title,
      description,
      location,
      date: eventDateTime.toISOString(),
      time,
      userId: "789",
    };

    addEvent(newEvent);
    onBack();
  };

  return (
    <Fade in timeout={500}>
      <StyledContainer>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Add New Event
        </Typography>
        <TextField
          label="Title"
          placeholder="Enter the title of the event"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={inputStyle}
        />
        <TextField
          label="Description"
          placeholder="Add description of the event"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={inputStyle}
        />
        <TextField
          label="Location"
          placeholder="Add location of the event"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={inputStyle}
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "2rem",
          }}
        >
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={inputStyle}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            sx={inputStyle}
          />
        </Box>
        <Box width="100%" display="flex" justifyContent="end">
          <StyledButton variant="outlined" color="primary" onClick={handleSave}>
            Add Event
          </StyledButton>
        </Box>
      </StyledContainer>
    </Fade>
  );
};

const StyledContainer = styled(Box)(({ theme }) => ({
  maxHeight: "70vh",
  overflowY: "auto",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "2rem",
  backgroundColor: theme.palette.background.default,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#b0bec5",
    },
    "&:hover fieldset": {
      borderColor: "#1e88e5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1e88e5",
    },
  },
};

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "0.75rem",
  fontWeight: "bold",
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: `0 4px 12px ${theme.palette.primary.main}55`,
    transform: "translateY(-2px)",
  },
}));

export default AddEvent;
