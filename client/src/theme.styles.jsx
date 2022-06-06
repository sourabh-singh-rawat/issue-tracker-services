import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#2159b1", text: "#202020", text2: "#192252" },
    background: {
      main: "#f2f7fa",
      main2: "#e5e5e5",
      main3: "#e8eef7",
      tabs: "transparent",
    },
  },
  typography: { fontFamily: ["inter", "arial"].join(",") },
});

createTheme(theme);
