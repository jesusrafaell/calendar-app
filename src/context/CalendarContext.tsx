import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import dayjs from "dayjs";
import { IEvent } from "../types/events";
import { eventsMock } from "../utils/mockEvents";

interface CalendarContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  selectedDay: dayjs.Dayjs | null;
  setSelectedDay: (day: dayjs.Dayjs | null) => void;
  selectedEvent: IEvent | null;
  setSelectedEvent: (event: IEvent | null) => void;
  getEvents: (day: dayjs.Dayjs) => IEvent[];
  addEvent: (newEvent: IEvent) => void;
  updateEvent: (updatedEvent: IEvent) => void;
  deleteEvent: (id: string) => void;
  filteredMonthEvents: IEvent[];
  //modal
  modalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const CalendarContext = createContext<CalendarContextProps>({
  monthIndex: 0,
  setMonthIndex: () => {},
  selectedDay: null,
  setSelectedDay: () => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  getEvents: () => [],
  addEvent: () => {},
  deleteEvent: () => {},
  updateEvent: () => {},
  filteredMonthEvents: [],
  modalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  return context;
};

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const filteredMonthEvents = useMemo(() => {
    return events
      .filter((event) =>
        dayjs(event.date).isSame(dayjs().month(monthIndex), "month")
      )
      .sort((a, b) => {
        const dateA = dayjs(a.date);
        const dateB = dayjs(b.date);

        if (dateA.isBefore(dateB)) return -1;
        if (dateA.isAfter(dateB)) return 1;

        const timeA = dayjs(a.date).format("HH:mm");
        const timeB = dayjs(b.date).format("HH:mm");

        return timeA.localeCompare(timeB);
      });
  }, [events, monthIndex]);

  useEffect(() => {
    setEvents(eventsMock);
  }, []);

  const getEvents = (day: dayjs.Dayjs) => {
    const filteredEvents = filteredMonthEvents.filter((event) => {
      const eventDate = dayjs(event.date).format("YYYY-MM-DD");
      const selectedDate = day.format("YYYY-MM-DD");
      return eventDate === selectedDate;
    });

    return filteredEvents.sort((a, b) => {
      const timeA = dayjs(a.date).format("HH:mm");
      const timeB = dayjs(b.date).format("HH:mm");
      return timeA.localeCompare(timeB);
    });
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const addEvent = (newEvent: IEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const updateEvent = (updatedEvent: IEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setSelectedEvent(null);
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        selectedDay,
        setSelectedDay,
        selectedEvent,
        setSelectedEvent,
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        filteredMonthEvents,
        modalOpen,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
