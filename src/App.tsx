import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "./utils/theme/theme";
import AppRoutes from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
