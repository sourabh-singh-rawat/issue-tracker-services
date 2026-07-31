import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useExchangeTokenMutation } from "@generated/api/@tanstack/react-query.gen";

const CODE_VERIFIER_KEY = "identity.oidc_code_verifier";

export const CallbackForm = () => {
  const {
    code,
    error,
    error_description: errorDescription,
  } = useSearch({
    from: "/(no-auth)/callback",
  });
  const [message, setMessage] = useState("Completing sign-in…");
  const [isError, setIsError] = useState(false);
  const started = useRef(false);
  const exchangeTokenMutation = useExchangeTokenMutation();

  useEffect(() => {
    if (started.current) {
      return;
    }
    started.current = true;

    const run = async () => {
      if (error) {
        setIsError(true);
        setMessage(errorDescription ?? error);
        return;
      }

      if (!code) {
        setIsError(true);
        setMessage("Missing authorization code.");
        return;
      }

      const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_KEY);
      if (!codeVerifier) {
        setIsError(true);
        setMessage("Missing PKCE code verifier. Please try signing in again.");
        return;
      }

      try {
        await exchangeTokenMutation.mutateAsync({
          body: {
            grant_type: "authorization_code",
            code,
            client_id: import.meta.env.VITE_IDENTITY_WEB_OIDC_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_IDENTITY_WEB_OIDC_REDIRECT_URI,
            code_verifier: codeVerifier,
          },
        });
        sessionStorage.removeItem(CODE_VERIFIER_KEY);
        setMessage("Sign-in complete.");
      } catch (err) {
        setIsError(true);
        setMessage(err instanceof Error ? err.message : "Token exchange failed.");
      }
    };

    void run();
  }, [code, error, errorDescription, exchangeTokenMutation]);

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} sx={{ alignItems: "center", py: 4 }}>
        {!isError && message === "Completing sign-in…" ? <CircularProgress size={32} /> : null}
        <Typography color={isError ? "error" : "text.secondary"}>{message}</Typography>
      </Stack>
    </Container>
  );
};
