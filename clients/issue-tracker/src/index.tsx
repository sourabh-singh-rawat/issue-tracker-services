import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { theme } from "./app/themes/mui.theme";
import { store } from "./app/stores/redux.store";

import App from "./app/App";
import MessageBar from "./features/message-bar/components/MessageBar";

const element = document.getElementById("root");
if (!element) throw new Error("Cannot find root element in DOM");

const root = createRoot(element);
const httpLink = new HttpLink({
  uri: "http://localhost:4000",
  credentials: "include",
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([httpLink]),
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
