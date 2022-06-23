import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "",
      main: "#5e1fec",
      dark: "",
    },
    text: {
      main: "#3e3b48",
      subtitle1: "#3e3b48",
    },
    background: {
      default: "#fbfaff",
      appbar: "#1e212a",
    },
  },
  typography: {
    fontFamily: ["inter", "arial"].join(","),
    fontWeightRegular: 400,
    h4: { fontSize: 30 },
    body1: { fontSize: 15 },
  },
});

createTheme(theme);
