import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Collapse,
  IconButton,
} from "@mui/material";
import { IEvent } from "../../types/events";
import { isCompleted } from "../../utils/isCompled";
import { useCalendarContext } from "../../context/CalendarContext";
import DeleteIcon from "@mui/icons-material/Delete";

const CardEvent: React.FC<{ event: IEvent }> = ({ event }) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const [editableEvent, setEditableEvent] = useState<IEvent>(event);

  const { updateEvent, selectedEvent, setSelectedEvent, deleteEvent } =
    useCalendarContext();

  useEffect(() => {
    if (selectedEvent && selectedEvent.id != event.id) {
      handleCollapse();
    }
  }, [selectedEvent, expanded]);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => {
    setHover(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (expanded) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const offsetX = (x / rect.width - 0.5) * 10;
    const offsetY = (y / rect.height - 0.5) * 5;
    setMousePos({ x: offsetX, y: offsetY });
  };

  const handleExpand = () => {
    if (!expanded) {
      setSelectedEvent(event);
      setExpanded(true);
    }
  };

  const handleCollapse = () => {
    setExpanded(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (field: keyof IEvent, value: string) => {
    setEditableEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateEvent(editableEvent);
    setExpanded(false);
  };

  const handleDeleteClick = () => {
    deleteEvent(event.id);
    handleCollapse();
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleExpand}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        borderRadius: "12px",
        backgroundColor: theme.palette.background.paper,
        zIndex: expanded ? "99" : "1",
        boxShadow:
          hover && !expanded
            ? "0 8px 20px rgba(0, 0, 0, 0.2)"
            : "0 2px 10px rgba(0, 0, 0, 0.1)",
        cursor: expanded ? "" : "pointer",
        transform:
          hover && !expanded
            ? `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.05)`
            : "scale(1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Time */}
      <Collapse in={!expanded} timeout={400} orientation="horizontal">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "80px",
            padding: "0.5rem",
            height: "80px",
            borderRadius: "8px",
            bgcolor: isCompleted(event.date)
              ? theme.palette.custom.red200
              : theme.palette.custom.indigo200,
            textAlign: "center",
            color: theme.palette.primary.contrastText,
            position: "relative",
            opacity: expanded ? 0 : 1,
            transform: expanded ? "translateX(-50%)" : "translateX(0)",
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {event.time}
          </Typography>
        </Box>
        {/* )} */}
      </Collapse>

      {/* Info */}
      <Box sx={{ flex: 1, marginLeft: "1rem" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => (expanded ? handleCollapse() : handleExpand())}
          >
            {event.title}
          </Typography>
          {expanded && (
            <IconButton
              onClick={handleDeleteClick}
              color="error"
              aria-label="delete event"
            >
              <DeleteIcon color="info" />
            </IconButton>
          )}
        </Box>
        {!expanded && (
          <Typography variant="body2" color="text.secondary">
            {truncateText(event.description, 120)}
          </Typography>
        )}

        <Collapse in={expanded} timeout={300}>
          <Box sx={{ marginTop: "1rem" }}>
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
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={editableEvent.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              margin="normal"
            />
            <TextField
              label="Location"
              fullWidth
              value={editableEvent.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              margin="normal"
            />
            <Box display="flex" justifyContent="flex-end" marginTop="1rem">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ marginRight: "1rem" }}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={handleCollapse}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default CardEvent;
