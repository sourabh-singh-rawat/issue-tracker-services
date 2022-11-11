import { createTheme } from "@mui/material";

const themeConfig = {
  palette: {
    primary: {
      main: "#3a3ece",
      onPrimary: "#FFFFFF",
      container: "#EADDFF",
      dark: "#21005D",
    },
    secondary: {
      main: "#625B71",
      onSecondary: "##FFFFFF",
      container: "#E8DEF8",
      dark: "#1D192B",
    },
    tertiary: {
      main: "#7D5260",
      onTertiary: "#FFFFFF",
      contaienr: "#FFD8E4",
      dark: "#31111D",
    },
    error: {
      main: "#B3261E",
      onError: "#FFFFFF",
      container: "#F9DEDC",
      dark: "#410E0B",
    },
    text: {
      background: "#FFFBFE",
      onBackground: "#1C1B1F",
      surface: "#FFFBFE",
      onSurface: "#1C1B1F",
    },
    outline: {
      main: "#79747E",
      surfaceVariant: "#E7E0EC",
      onSurfaceVariant: "#49454F",
    },
    warning: {
      main: "#FF6700",
      dark: "#F56200",
    },
    background: {
      paper: "#FFF",
      default: "#FFF",
    },
    action: {
      hover: "#EEEEEE",
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
    h1: {},
    h2: {},
    h3: { fontSize: 32, fontWeight: 500 },
    h4: { fontSize: 24, fontWeight: 500 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
  },
};

export const theme = createTheme(themeConfig);
