import { createRoot } from "react-dom/client";
import { AppQueryProvider } from "@bootstrap/query-client";
import { AppRouterProvider } from "@bootstrap/router";
import { AppThemeProvider } from "@bootstrap/theme";

createRoot(document.getElementById("root")!).render(
  <AppQueryProvider>
    <AppThemeProvider>
      <AppRouterProvider />
    </AppThemeProvider>
  </AppQueryProvider>,
);
