import React from "react";
import Calendar from "../components/Calendar/Calendar";
import { CalendarProvider } from "../context/CalendarContext";

const HomePage: React.FC = () => {
  return (
    <CalendarProvider>
      <div
        style={{
          // display: "flex",
          // justifyContent: "end",
          // alignItems: "end",
          padding: "1rem",
        }}
      >
        <Calendar />
      </div>
    </CalendarProvider>
  );
};

export default HomePage;
