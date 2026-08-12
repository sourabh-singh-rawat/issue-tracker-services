import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pineShape } from "@pine/ui";
import { SnackbarProvider } from "notistack";
import type { PropsWithChildren } from "react";
import { SnackbarContent } from "@shared/ui/snackbar";

declare module "@mui/material/styles" {
  interface Shape {
    borderRadiusNone: string;
    borderRadiusSmall: string;
    borderRadiusMedium: string;
    borderRadiusLarge: string;
    borderRadiusExtraLarge: string;
    borderRadiusExtraExtraLarge: string;
    borderRadiusRounded: string;
  }
}

const NOTO_SANS_URL = "/noto-sans-regular.ttf";

const APP_FONT_SIZE = "14px";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#65676e",
    },
    divider: "#c9cace",
    grey: {
      400: "#c9cace",
      500: "#8c8c94",
      600: "#5c5c66",
      700: "#8b8b96",
    },
  },
  shape: {
    borderRadius: 4,
    ...pineShape,
  },
  typography: {
    fontFamily: '"Noto Sans", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    htmlFontSize: 16,
    body1: { fontSize: APP_FONT_SIZE },
    body2: { fontSize: APP_FONT_SIZE },
    button: { fontSize: APP_FONT_SIZE },
    subtitle1: { fontSize: APP_FONT_SIZE },
    subtitle2: { fontSize: APP_FONT_SIZE },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: APP_FONT_SIZE,
        },
        body: {
          fontSize: APP_FONT_SIZE,
        },
      },
    },
  },
});

export const AppThemeProvider = ({ children }: Readonly<PropsWithChildren>) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles
      styles={{
        "@font-face": {
          fontFamily: "Noto Sans",
          fontStyle: "normal",
          fontDisplay: "swap",
          fontWeight: 400,
          src: `url(${NOTO_SANS_URL}) format("truetype")`,
        },
      }}
    />
    <CssBaseline />
    <SnackbarProvider
      Components={{
        success: SnackbarContent,
        error: SnackbarContent,
        warning: SnackbarContent,
        info: SnackbarContent,
        default: SnackbarContent,
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      maxSnack={4}
      autoHideDuration={4000}
      dense
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  </ThemeProvider>
);
