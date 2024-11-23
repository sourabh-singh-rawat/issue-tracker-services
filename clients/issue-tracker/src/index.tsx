import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import { theme } from "./app/themes/mui.theme";
import { store } from "./app/stores/redux.store";

import App from "./app/App";
import MessageBar from "./features/message-bar/components/MessageBar";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const element = document.getElementById("root");
if (!element) throw new Error("Cannot find root element in DOM");

const root = createRoot(element);
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  credentials: "include",
});

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <MessageBar />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
);
