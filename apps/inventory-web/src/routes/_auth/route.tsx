import { authorize } from "@generated/api";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import {
  createPkcePair,
  isAuthenticated,
  setOidcCodeVerifier,
  setOidcState,
} from "../../lib/auth";

const startOidcLogin = async (): Promise<string> => {
  const state = crypto.randomUUID();
  const { codeVerifier, codeChallenge } = await createPkcePair();

  setOidcState(state);
  setOidcCodeVerifier(codeVerifier);

  const { data } = await authorize({
    query: {
      response_type: "code",
      client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
      scope: import.meta.env.VITE_OIDC_SCOPES,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    },
  });

  if (!data?.redirectTo) {
    throw new Error("Authorize response did not include redirectTo.");
  }

  return data.redirectTo;
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
