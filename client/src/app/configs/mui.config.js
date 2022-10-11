const themeConfig = {
  palette: {
    primary: {
      main: "#635DFF",
      dark: "#030066",
    },
    secondary: {
      main: "#152828",
    },
    text: {
      primary: "#080F0F",
      secondary: "#5E5A5A",
      disabled: "#080F0F",
    },
    // error: {
    //   // main: "",
    //   // dark: "",
    // },
    warning: {
      main: "#FF6700",
      dark: "#F56200",
    },
    background: {
      paper: "#fbf7f4",
      default: "#FFF",
    },
    action: {
      hover: "#EBEBEB",
    },
  },
  typography: {
    fontFamily: ["Inter"].join(","),
    h4: { fontSize: 30, fontFamily: ["Inter"] },
    body2: { fontSize: 14 },
  },
};

export default themeConfig;
