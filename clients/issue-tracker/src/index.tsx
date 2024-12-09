import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/stores/redux.store";
import { theme } from "./app/themes/mui.theme";

import App from "./app/App";
import { SnackbarContent } from "./common/components/Snackbar";

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
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        Components={{ success: SnackbarContent, error: SnackbarContent }}
        iconVariant={{ error: "❌", success: "✅" }}
        maxSnack={4}
        autoHideDuration={2000}
      >
        <Provider store={store}>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </ApolloProvider>,
);
