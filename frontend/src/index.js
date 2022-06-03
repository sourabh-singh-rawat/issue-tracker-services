import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";

import { theme } from "./theme.styles";

import App from "./App";
import "./index.css";

//creating root element
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
