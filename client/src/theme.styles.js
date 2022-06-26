import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "",
      main: "#112edd",
      dark: "",
    },
    text: {
      main: "#3e3b48",
      subtitle1: "#828282",
    },
    background: {
      // default: "#fbfaff",
      appbar: "#1e212a",
    },
  },
  typography: {
    fontFamily: ["inter", "arial"].join(","),
    fontWeightRegular: 400,
    h4: { fontSize: 30 },
    body1: { fontSize: 16 },
  },
});

createTheme(theme);
