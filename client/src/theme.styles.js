import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#635dff",
      light: "",
      dark: "",
    },
    text: {
      main: "#1e212a",
      subtitle1: "#65676e",
    },
    background: {
      default: "#f7f7f8",
      tabs: "#ededee",
    },
  },
  typography: {
    fontFamily: ["inter", "arial"].join(","),
    subtitle1: { fontSize: 30 },
  },
  components: {
    MuiTypography: {
      defaultProps: {},
    },
  },
});

createTheme(theme);
