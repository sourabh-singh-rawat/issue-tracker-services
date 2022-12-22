/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';

import theme from './config/mui.config.js';
import store from './config/redux.config.js';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
