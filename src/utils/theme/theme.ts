import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      red200: string;
      indigo200: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      red200?: string;
      indigo200?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    info: {
      main: "#969696",
    },
    custom: {
      red200: "#fecaca",
      indigo200: "#c7d2fe",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
