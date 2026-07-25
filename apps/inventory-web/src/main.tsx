import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppQueryProvider } from "@bootstrap/query-client";
import { AppRouterProvider } from "@bootstrap/router";
import { AppThemeProvider } from "@bootstrap/theme";

const element = document.getElementById("root");
if (!element) throw new Error("Cannot find root element in DOM");

createRoot(element).render(
  <StrictMode>
    <AppQueryProvider>
      <AppThemeProvider>
        <AppRouterProvider />
      </AppThemeProvider>
    </AppQueryProvider>
  </StrictMode>,
);
