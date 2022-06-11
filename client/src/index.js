import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme.styles";

import App from "./App";
import "./index.css";
import { CssBaseline } from "@mui/material";

//creating root element
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
