import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    shape: {
      borderWidthDefault: string;
      borderWidthInput: string;
      borderWidthInputOverlayUnfocused: string;
      borderWidthMarked: string;
      borderWidthSpinner: string;
      borderWidthTag: string;
      borderRadiusNone: string;
      borderRadiusSmall: string;
      borderRadiusMedium: string;
      borderRadiusLarge: string;
      borderRadiusExtraLarge: string;
      borderRadiusExtraExtraLarge: string;
      borderRadiusRounded: string;
    };
  }

  interface ThemeOptions {
    shape: {
      borderWidthDefault: string;
      borderWidthInput: string;
      borderWidthInputOverlayUnfocused: string;
      borderWidthMarked: string;
      borderWidthSpinner: string;
      borderWidthTag: string;
      borderRadiusNone: string;
      borderRadiusSmall: string;
      borderRadiusMedium: string;
      borderRadiusLarge: string;
      borderRadiusExtraLarge: string;
      borderRadiusExtraExtraLarge: string;
      borderRadiusRounded: string;
    };
  }
}

export const theme = createTheme({
  spacing: 8,
  palette: {
    mode: "light",
    primary: {
      main: "#6e56cf",
      dark: "#5136BF",
    },
    secondary: {
      main: "#323239",
      100: "#f7f7f8",
      200: "#e6e6ea",
      300: "#d3d3d9",
      400: "#dedee3",
      500: "#adadb8",
      600: "#53535f",
      700: "#323239",
      800: "#1f1f23",
      900: "#0e0e10",
    },
    error: {
      main: "#bb1411",
      dark: "#530a09",
      light: "#eb0400",
    },
    success: {
      main: "#018852",
      dark: "#074029",
    },
    warning: {
      main: "#7c570e",
      dark: "#372706",
      light: "#9e6900",
    },
    grey: {
      100: "#f7f7f8",
      200: "#e6e6ea",
      300: "#d3d3d9",
      400: "#dedee3",
      500: "#adadb8",
      600: "#53535f",
      700: "#323239",
      800: "#1f1f23",
      900: "#0e0e10",
    },
    text: { primary: "#191919" },
    divider: "#d3d3d9",
  },
  shape: {
    borderWidthDefault: "1px",
    borderWidthInput: "2px",
    borderWidthInputOverlayUnfocused: "1px",
    borderWidthMarked: "3px",
    borderWidthSpinner: "2px",
    borderWidthTag: "2px",
    borderRadiusNone: "0",
    borderRadiusSmall: "0.2rem",
    borderRadiusMedium: "0.4rem",
    borderRadiusLarge: "0.6rem",
    borderRadiusExtraLarge: "1rem",
    borderRadiusExtraExtraLarge: "1.6rem",
    borderRadiusRounded: "9000px",
  },
  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,.13), 0 0px 2px rgba(0,0,0,.08)",
    "0 4px 8px rgba(0,0,0,.16), 0 0px 4px rgba(0,0,0,.05)",
    "0 4px 8px rgba(0,0,0,.16), 0 0px 4px rgba(0,0,0,.05)",
    "0 6px 16px rgba(0,0,0,.16), 0 0px 4px rgba(0,0,0,.05)",
    "0 12px 32px rgba(0,0,0,.16), 0 0px 8px rgba(0,0,0,.05)",
    "0 32px 64px rgba(0,0,0,.16), 0 0px 16px rgba(0,0,0,.05)",
    "0 1px 2px rgba(0,0,0,.05), 0 0px 1px rgba(0,0,0,.03)",
    "0 2px 4px rgba(0,0,0,.07), 0 0px 2px rgba(0,0,0,.05)",
    "0 3px 6px rgba(0,0,0,.08), 0 0px 3px rgba(0,0,0,.06)",
    "0 8px 16px rgba(0,0,0,.16), 0 0px 6px rgba(0,0,0,.05)",
    "0 16px 32px rgba(0,0,0,.16), 0 0px 12px rgba(0,0,0,.05)",
    "0 1px 3px rgba(0,0,0,.06), 0 0px 1px rgba(0,0,0,.03)",
    "0 2px 4px rgba(0,0,0,.08), 0 0px 2px rgba(0,0,0,.05)",
    "0 4px 8px rgba(0,0,0,.12), 0 0px 4px rgba(0,0,0,.08)",
    "0 6px 12px rgba(0,0,0,.12), 0 0px 6px rgba(0,0,0,.08)",
    "0 8px 16px rgba(0,0,0,.12), 0 0px 8px rgba(0,0,0,.08)",
    "0 12px 24px rgba(0,0,0,.12), 0 0px 12px rgba(0,0,0,.08)",
    "0 18px 36px rgba(0,0,0,.12), 0 0px 16px rgba(0,0,0,.08)",
    "0 24px 48px rgba(0,0,0,.12), 0 0px 20px rgba(0,0,0,.08)",
    "0 32px 64px rgba(0,0,0,.12), 0 0px 24px rgba(0,0,0,.08)",
    "0 1px 2px rgba(0,0,0,.16), 0 0px 1px rgba(0,0,0,.08)",
    "0 2px 4px rgba(0,0,0,.16), 0 0px 2px rgba(0,0,0,.08)",
    "0 4px 8px rgba(0,0,0,.16), 0 0px 4px rgba(0,0,0,.08)",
    "0 4px 8px rgba(0,0,0,.16), 0 0px 4px rgba(0,0,0,.08)",
  ],
  typography: {
    fontFamily: "inter",
    fontSize: 14,
    h1: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h2: { fontSize: "2rem" },
    h3: { fontSize: "1.75rem" },
    h4: { fontSize: "1.5rem" },
    h5: { fontSize: "1.25rem" },
    h6: { fontSize: "1rem" },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.8125rem" },
  },
});

// const lightThemeConfig = {
//   palette: {
//     mode: "light",
//     primary: {
//       100: "#040109",
//       200: "#0d031c",
//       300: "#15052e",
//       400: "#24094e",
//       500: "#330c6e",
//       600: "#451093",
//       700: "#5c16c5",
//       800: "#772ce8",
//       900: "#9147ff",
//     },
//     grey: {
//       100: "#0e0e10",
//       200: "#18181b",
//       300: "#1f1f23",
//       400: "#26262c",
//       500: "#323239",
//       600: "#3b3b44",
//       700: "#53535f",
//       800: "#848494",
//       900: "#adadb8",
//     },
//     green: {
//       100: "#010503",
//       200: "#010906",
//       300: "#02120c",
//       400: "#042015",
//       500: "#063221",
//       600: "#074029",
//       700: "#0a5738",
//       800: "#016b40",
//       900: "#018852",
//     },
//     blue: {
//       100: "#010205",
//       200: "#020712",
//       300: "#040d20",
//       400: "#071a40",
//       500: "#0a255c",
//       600: "#0d3177",
//       700: "#1345aa",
//       800: "#1756d3",
//       900: "#1f69ff",
//     },
//     orange: {
//       100: "#050301",
//       200: "#090601",
//       300: "#120d02",
//       400: "#251a04",
//       500: "#372706",
//       600: "#453008",
//       700: "#65470b",
//       800: "#7c570e",
//       900: "#9e6900",
//     },
//     red: {
//       100: "#050101",
//       200: "#120202",
//       300: "#200404",
//       400: "#3c0807",
//       500: "#530a09",
//       600: "#6e0e0c",
//       700: "#971311",
//       800: "#bb1411",
//       900: "#eb0400",
//     },
//     secondary: { main: "#625B71", dark: "#1D192B" },
//     text: { primary: "#FFFBFE" },
//     error: { main: "#B3261E", dark: "#410E0B" },
//     warning: { main: "#f6381f", dark: "#c32c18" },
//     background: { default: "#f7f7f8", paper: "#efeff1" },
//     action: {},
//   },
//   shape: {
//     borderWidthDefault: "1px",
//     borderWidthInput: "2px",
//     borderWidthInputOverlayUnfocused: "1px",
//     borderWidthMarked: "3px",
//     borderWidthSpinner: "2px",
//     borderWidthTag: "2px",
//     borderRadiusNone: "0",
//     borderRadiusSmall: "0.2rem",
//     borderRadiusMedium: "0.4rem",
//     borderRadiusLarge: "0.6rem",
//     borderRadiusExtraLarge: "1rem",
//     borderRadiusExtraExtraLarge: "1.6rem",
//     borderRadiusRounded: "9000px",
//   },
//   typography: {
//     fontSize: 14,
//     fontFamily: "-apple-system,BlinkMacSystemFont, Inter",
//     fontWeightLight: 300,
//     fontWeightRegular: 400,
//     fontWeightMedium: 500,
//     fontWeightBold: 700,
//     h1: {
//       fontSize: "2.5rem",
//       fontWeight: 700,
//       lineHeight: 1.2,
//       letterSpacing: "-0.01562em",
//     },
//     h2: {
//       fontSize: "2rem",
//       fontWeight: 700,
//       lineHeight: 1.2,
//       letterSpacing: "-0.00833em",
//     },
//     h3: {
//       fontSize: "1.75rem",
//       fontWeight: 700,
//       lineHeight: 1.2,
//       letterSpacing: "0em",
//     },
//     h4: {
//       fontSize: "1.5rem",
//       fontWeight: 700,
//       lineHeight: 1.2,
//       letterSpacing: "0.00735em",
//     },
//     h5: {
//       fontSize: "1.25rem",
//       fontWeight: 700,
//       lineHeight: 1.2,
//       letterSpacing: "0em",
//     },
//     h6: {
//       fontSize: "1rem",
//       fontWeight: 700,
//       lineHeight: 1.2,
//       letterSpacing: "0.0075em",
//     },
//     body1: {
//       fontSize: "1rem",
//       fontWeight: 400,
//       lineHeight: 1.2,
//       letterSpacing: "0.0075em",
//     },
//     body2: {
//       fontSize: "0.875rem",
//       fontWeight: 400,
//       lineHeight: 1.2,
//       letterSpacing: "0.0075em",
//     },
//   },
//   shadows: [
//     "0 1px 2px rgba(0,0,0,.13), 0 0px 2px rgba(0,0,0,.08)",
//     "0 4px 8px rgba(0,0,0,.16), 0 0px 4px rgba(0,0,0,.05)",
//     "0 4px 8px rgba(0,0,0,.16), 0 0px 4px rgba(0,0,0,.05)",
//     "0 6px 16px rgba(0,0,0,.16), 0 0px 4px rgba(0,0,0,.05)",
//     "0 12px 32px rgba(0,0,0,.16), 0 0px 8px rgba(0,0,0,.05)",
//     "0 32px 64px rgba(0,0,0,.16), 0 0px 16px rgba(0,0,0,.05)",
//   ],
// };
