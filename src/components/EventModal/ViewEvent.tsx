import React from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  Grow,
  useTheme,
} from "@mui/material";
import { IEvent } from "../../types/events";
import { useCalendarContext } from "../../context/CalendarContext";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

interface Props {
  event: IEvent;
  handleClose: () => void;
}

const ViewEvent: React.FC<Props> = ({ event, handleClose }) => {
  const { updateEvent, deleteEvent } = useCalendarContext();

  const [editableEvent, setEditableEvent] = React.useState<IEvent>(event);
  const [isEdited, setIsEdited] = React.useState(false);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleInputChange = (field: keyof IEvent, value: string) => {
    setEditableEvent((prev) => ({ ...prev, [field]: value }));
    setIsEdited(true);
  };

  const handleSave = () => {
    updateEvent(editableEvent);
    setIsEdited(false);
    handleClose();
  };

  const handleDateChange = (newDate: string) => {
    const updatedDate = dayjs(newDate).format("YYYY-MM-DD");
    setEditableEvent((prev) => ({ ...prev, date: updatedDate }));
    setIsEdited(true);
  };

  const handleDeleteClick = () => {
    deleteEvent(event.id);
    handleClose();
  };

  const isFieldChanged = () =>
    editableEvent.title !== event.title ||
    editableEvent.description !== event.description ||
    editableEvent.time !== event.time ||
    editableEvent.location !== event.location;

  React.useEffect(() => {
    setIsEdited(isFieldChanged());
  }, [editableEvent]);

  return (
    <Box
      sx={{
        paddingLeft: "2rem",
        paddingRight: "2rem",
        marginTop: "-1rem",
        paddingBottom: "2rem",
      }}
    >
      <TextField
        label="Title"
        fullWidth
        value={editableEvent.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        value={editableEvent.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        margin="normal"
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "2rem",
        }}
      >
        <TextField
          label="Time"
          type="time"
          fullWidth
          value={editableEvent.time}
          onChange={(e) => handleInputChange("time", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={dayjs(editableEvent.date).format("YYYY-MM-DD")}
          onChange={(e) => handleDateChange(e.target.value)}
          margin="normal"
        />
      </Box>
      <TextField
        label="Location"
        fullWidth
        value={editableEvent.location}
        onChange={(e) => handleInputChange("location", e.target.value)}
        margin="normal"
      />
      <Box
        display="flex"
        justifyContent="space-between"
        marginLeft="1rem"
        marginRight="1rem"
        marginTop="1rem"
      >
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteClick} aria-label="delete event">
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
        {isEdited && (
          <Grow
            in={isEdited}
            timeout={500}
            style={{ transformOrigin: "center center" }}
          >
            <Button variant="outlined" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grow>
        )}
      </Box>
    </Box>
  );
};

export default ViewEvent;
