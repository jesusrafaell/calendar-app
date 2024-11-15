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
  getEvents: (day: dayjs.Dayjs) => IEvent[];
  filteredMonthEvents: IEvent[];
}

const CalendarContext = createContext<CalendarContextProps>({
  monthIndex: 0,
  setMonthIndex: () => {},
  selectedDay: null,
  setSelectedDay: () => {},
  getEvents: () => [],
  filteredMonthEvents: [],
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
  const [events, setEvents] = useState<IEvent[]>([]);

  const filteredMonthEvents = useMemo(() => {
    return events.filter((event) =>
      dayjs(event.date).isSame(dayjs().month(monthIndex), "month")
    );
  }, [events, monthIndex]);

  useEffect(() => {
    setEvents(eventsMock);
  }, []);

  const getEvents = (day: dayjs.Dayjs) => {
    return events.filter((event) => day.isSame(event.date, "day"));
  };

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        selectedDay,
        setSelectedDay,
        getEvents,
        filteredMonthEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
