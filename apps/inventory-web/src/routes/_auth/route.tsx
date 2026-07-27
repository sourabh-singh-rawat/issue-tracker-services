import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { createPkcePair, isAuthenticated, setOidcCodeVerifier, setOidcState } from "../../lib/auth";

const startOidcLogin = async (): Promise<string> => {
  const state = crypto.randomUUID();
  const { codeVerifier, codeChallenge } = await createPkcePair();

  setOidcState(state);
  setOidcCodeVerifier(codeVerifier);

  const authorizeUrl = new URL("/identity/oauth/authorize", import.meta.env.VITE_API_BASE_URL);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", import.meta.env.VITE_INVENTORY_WEB_OIDC_CLIENT_ID);
  authorizeUrl.searchParams.set(
    "redirect_uri",
    import.meta.env.VITE_INVENTORY_WEB_OIDC_REDIRECT_URI,
  );
  authorizeUrl.searchParams.set("scope", import.meta.env.VITE_OIDC_SCOPES);
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");

  // Full-page navigation so the browser follows the server's 302 to the IdP.
  return authorizeUrl.toString();
};

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      return;
    }

    throw redirect({
      href: await startOidcLogin(),
    });
  },
  component: () => <Outlet />,
});
