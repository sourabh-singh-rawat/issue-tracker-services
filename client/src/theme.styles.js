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
  },
  typography: {
    fontFamily: ["inter", "arial"].join(","),
    subtitle1: { fontSize: 30 },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
    },
  },
});

createTheme(theme);
