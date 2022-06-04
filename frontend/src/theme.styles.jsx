import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#058079", text: "#202020" },
    background: {
      main: "#F7F7F7",
      main2: "#e5e5e5",
      main3: "#b2b2b2",
      tabs: "#E2EDEC",
    },
  },
  typography: { fontFamily: ["inter", "arial"].join(",") },
});

createTheme(theme);
