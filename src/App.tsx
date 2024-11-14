import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "./utils/theme/theme";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" align="center">
          Welcome to My React App with Material UI Theme
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default App;
