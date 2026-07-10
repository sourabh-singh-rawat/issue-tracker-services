import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { createAppQueryClient } from "./core/query-client";
import { store } from "./core/stores/redux.store";
import { theme } from "./core/themes/mui.theme";

import App from "./core/App";
import { SnackbarContent } from "./common/components/Snackbar";

const element = document.getElementById("root");
if (!element) throw new Error("Cannot find root element in DOM");

const root = createRoot(element);
const queryClient = createAppQueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        Components={{ success: SnackbarContent, error: SnackbarContent }}
        iconVariant={{ error: "❌", success: "✅" }}
        maxSnack={4}
        autoHideDuration={2000}
      >
        <Provider store={store}>
          <CssBaseline />
          <App />
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
  </QueryClientProvider>,
);
