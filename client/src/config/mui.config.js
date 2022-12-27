/* eslint-disable import/prefer-default-export */
import { createTheme, darken } from '@mui/material';

const darkThemeConfig = {
  palette: {
    // mode: 'dark',
    primary: { main: '#9657ff', dark: darken('#9657ff', 0.4) },
    secondary: { main: '#625B71', dark: '#1D192B' },
    error: { main: '#B3261E', dark: '#410E0B' },
    text: {
      background: '#FFFBFE',
    },
    warning: { main: '#f6381f', dark: '#c32c18' },
    background: { default: '#f7f7f8', paper: '#efeff1', navbar: '#18181b' },
    action: {},
  },
  typography: {
    fontFamily: ['Inter'].join(','),
    h1: {},
    h2: {},
    h3: { fontSize: 32 },
    h4: { fontSize: 24 },
    body1: { fontSize: '18px' },
    body2: { fontSize: '14px' },
  },
};

const theme = createTheme(darkThemeConfig);

export default theme;
