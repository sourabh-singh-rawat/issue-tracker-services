import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#058079" },
    background: { main: "#F7F7F7", tabs: "#E2EDEC" },
  },
  typography: { fontFamily: ["inter"].join(",") },
});

createTheme(theme);
