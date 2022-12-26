/* eslint-disable import/prefer-default-export */
import { createTheme } from '@mui/material';

const themeConfig = {
  palette: {
    primary: {
      main: '#2559f8',
      dark: '#0d309a',
    },
    secondary: {
      main: '#625B71',
      dark: '#1D192B',
    },
    tertiary: {
      main: '#7D5260',
      dark: '#31111D',
    },
    error: {
      main: '#B3261E',
      onError: '#FFFFFF',
      container: '#F9DEDC',
      dark: '#410E0B',
    },
    text: {
      background: '#FFFBFE',
      onBackground: '#1C1B1F',
      surface: '#FFFBFE',
      onSurface: '#1C1B1F',
    },
    outline: {
      main: '#79747E',
      surfaceVariant: '#e1edfe',
      onSurfaceVariant: '#49454F',
    },
    warning: {
      main: '#f6381f',
      dark: '#c32c18',
    },
    background: {
      paper: '#FFF',
      default: '#f5f7f9',
    },
    action: {
      hover: '#EEEEEE',
    },
  },
  typography: {
    fontFamily: ['Inter'].join(','),
    h1: {},
    h2: {},
    h3: { fontSize: 32, fontWeight: 600 },
    h4: { fontSize: 24, fontWeight: 600 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
  },
};

const theme = createTheme(themeConfig);

export default theme;
