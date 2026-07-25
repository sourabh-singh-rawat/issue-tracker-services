import MuiGrid from "@mui/material/Grid";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSnackbar } from "@shared";
import { getIdentityWebLoginUrl } from "@shared/utils/identity-web";

/**
 * Email verification landing page.
 * Identity verification is handled by the identity service / Ory flow;
 * this route keeps a stable redirect target for email links.
 */
export function EmailVerificationPage() {
  const [pageMessage, setPageMessage] = useState("Please wait while we verify your email");
  const { token } = useSearch({ strict: false }) as { token?: string };
  const messageBar = useSnackbar();

  useEffect(() => {
    if (!token) {
      setPageMessage("Missing verification token");
      messageBar.error("Missing verification token");
      return;
    }

    // Token-based email verification is currently completed server-side
    // (identity / Kratos). Surface a friendly success and send users to identity-web login.
    messageBar.success("Email verification received");
    setPageMessage("Email verified. You will be redirected shortly");

    const timeout = setTimeout(() => {
      const redirectUrl =
        import.meta.env.VITE_EMAIL_VERIFICATION_REDIRECT_URL || getIdentityWebLoginUrl();
      window.location.assign(redirectUrl);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [token, messageBar]);

  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        {pageMessage}
      </MuiGrid>
    </MuiGrid>
  );
}
