import { createTheme } from "@mui/material";

const themeConfig = {
  palette: {
    primary: {
      main: "#772ce8",
      dark: "#5c16c5",
    },
    secondary: {
      main: "#333333",
      dark: "#1e212a",
    },
    text: {
      primary: "#080F0F",
      secondary: "#70757A",
    },
    warning: {
      main: "#FF6700",
      dark: "#F56200",
    },
    error: {
      main: "#eb0400",
    },
    background: {
      paper: "#FFFFFF",
      default: "#FAFAFA",
    },
    action: {
      hover: "#EEEEEE",
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
    h4: { fontSize: 30 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
  },
};

export const theme = createTheme(themeConfig);
