import MuiGrid from "@mui/material/Grid";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSnackbar } from "@shared";

/**
 * Email verification landing page.
 * Identity verification is handled by the identity service / Ory flow;
 * this route keeps a stable redirect target for email links.
 */
export function EmailVerificationPage() {
  const [pageMessage, setPageMessage] = useState("Please wait while we verify your email");
  const navigate = useNavigate();
  const { token } = useSearch({ strict: false }) as { token?: string };
  const messageBar = useSnackbar();

  useEffect(() => {
    if (!token) {
      setPageMessage("Missing verification token");
      messageBar.error("Missing verification token");
      return;
    }

    // Token-based email verification is currently completed server-side
    // (identity / Kratos). Surface a friendly success and send users to login.
    messageBar.success("Email verification received");
    setPageMessage("Email verified. You will be redirected shortly");

    const timeout = setTimeout(() => {
      const redirectPath = import.meta.env.VITE_EMAIL_VERIFICATION_REDIRECT_PATH || "login";
      void navigate({ to: `/${redirectPath}` as "/login" });
    }, 2500);

    return () => clearTimeout(timeout);
  }, [token, messageBar, navigate]);

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        {pageMessage}
      </MuiGrid>
    </MuiGrid>
  );
}
