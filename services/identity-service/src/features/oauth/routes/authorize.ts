import type { HttpRoute } from "@pine/server";
import { redirect } from "@pine/server";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import { AuthorizeQuerySchema } from "@/features/oauth/schemas";

function readQueryString(
  query: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = query[key];
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }
  return undefined;
}

export const authorize: HttpRoute = {
  url: "/identity/oauth/authorize",
  method: "GET",
  schema: {
    tags: ["oauth"],
    summary: "OAuth authorize",
    description:
      "Start the OAuth authorization code flow. Redirects (302) to the OAuth provider authorization endpoint.",
    operationId: "authorize",
    querystring: AuthorizeQuerySchema,
    response: {
      302: {
        description: "Redirect to the OAuth provider authorization endpoint",
        type: "null",
      },
    },
  },
  handler: async (request) => {
    const clientId = readQueryString(request.query, "client_id");
    const redirectUri = readQueryString(request.query, "redirect_uri");
    const responseType = readQueryString(request.query, "response_type");
    const scope = readQueryString(request.query, "scope");
    const state = readQueryString(request.query, "state");
    const codeChallenge = readQueryString(request.query, "code_challenge");
    const codeChallengeMethod = readQueryString(request.query, "code_challenge_method");
    const nonce = readQueryString(request.query, "nonce");

    if (
      clientId === undefined ||
      redirectUri === undefined ||
      responseType === undefined ||
      scope === undefined ||
      state === undefined
    ) {
      throw new Error("Missing required OAuth authorize query parameters");
    }

    if (responseType !== "code") {
      throw new Error("Unsupported OAuth response_type");
    }

    if (
      codeChallengeMethod !== undefined &&
      codeChallengeMethod !== "S256" &&
      codeChallengeMethod !== "plain"
    ) {
      throw new Error("Unsupported OAuth code_challenge_method");
    }

    const service = container.get<IOAuthService>(TYPES.OAuthService);

    const result = await service.authorize({
      clientId,
      redirectUri,
      responseType,
      scope,
      state,
      codeChallenge,
      codeChallengeMethod,
      nonce,
    });

    return redirect(result.redirectTo);
  },
};
