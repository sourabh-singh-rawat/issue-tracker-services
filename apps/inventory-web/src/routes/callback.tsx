import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { exchangeToken } from "@generated/api";
import {
  clearOidcCodeVerifier,
  clearOidcState,
  getOidcCodeVerifier,
  getOidcState,
  markAuthenticated,
} from "../lib/auth";

export const Route = createFileRoute("/callback")({
  validateSearch: (search: Record<string, unknown>) => ({
    code: typeof search.code === "string" ? search.code : undefined,
    state: typeof search.state === "string" ? search.state : undefined,
    error: typeof search.error === "string" ? search.error : undefined,
    error_description:
      typeof search.error_description === "string" ? search.error_description : undefined,
  }),
  component: CallbackPage,
});

function CallbackPage() {
  const navigate = useNavigate();
  const {
    code,
    state,
    error,
    error_description: errorDescription,
  } = useSearch({
    from: "/callback",
  });
  const [message, setMessage] = useState("Completing sign-in…");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) {
      return;
    }
    started.current = true;

    const run = async () => {
      if (error) {
        setMessage(errorDescription ?? error);
        return;
      }

      if (!code) {
        setMessage("Missing authorization code.");
        return;
      }

      const expectedState = getOidcState();
      if (expectedState && state !== expectedState) {
        setMessage("Invalid OAuth state. Please try signing in again.");
        clearOidcState();
        clearOidcCodeVerifier();
        return;
      }

      const codeVerifier = getOidcCodeVerifier();
      if (!codeVerifier) {
        setMessage("Missing PKCE code verifier. Please try signing in again.");
        clearOidcState();
        return;
      }

      try {
        await exchangeToken({
          body: {
            grant_type: "authorization_code",
            code,
            client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
            code_verifier: codeVerifier,
          },
        });

        // Tokens are set as HTTP-only cookies by the identity service.
        markAuthenticated();
        clearOidcState();
        clearOidcCodeVerifier();
        await navigate({ to: "/" });
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Token exchange failed.");
      }
    };

    void run();
  }, [code, state, error, errorDescription, navigate]);

  return <h1>{message}</h1>;
}
