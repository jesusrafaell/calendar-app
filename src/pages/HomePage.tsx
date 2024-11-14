import React from "react";
import { Typography, Container } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" align="center">
        Welcome to the Home Page
      </Typography>
      <Typography variant="subtitle1" align="center">
        This is where the calendar will be displayed.
      </Typography>
    </Container>
  );
};

export default HomePage;
