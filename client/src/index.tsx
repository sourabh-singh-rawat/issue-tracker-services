/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import store from "./app/store.config";
import { theme } from "./app/theme.config";

import App from "./app/App";
import MessageBar from "./features/message-bar/components/MessageBar";

import "./index.css";
import { CssBaseline } from "@mui/material";

const element = document.getElementById("root");

if (!element) {
  throw new Error("Cannot find root element in DOM");
}

const root = createRoot(element);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <MessageBar />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
