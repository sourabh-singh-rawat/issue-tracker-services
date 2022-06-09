import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2159b1",
      text: "#202020",
      text2: "#192252",
      text3: "#4d5156",
    },
    background: {
      main: "#f7f6f9",
      main2: "#e5e5e5",
      main3: "#e8eef7",
      main4: "#75747b",
      tabs: "transparent",
    },
  },
  typography: { fontFamily: ["inter", "arial"].join(",") },
});

createTheme(theme);
