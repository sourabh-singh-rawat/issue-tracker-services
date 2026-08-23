import type { HttpResponseCookie, HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import { TokenBodySchema, TokenResponseSchema, type TokenResponse } from "@/features/oauth/schemas";

const isTokenBody = (
  body: unknown,
): body is {
  grant_type: "authorization_code";
  code: string;
  client_id: string;
  redirect_uri: string;
  code_verifier: string;
} => {
  if (body === null || typeof body !== "object") {
    return false;
  }
  return (
    "grant_type" in body &&
    body.grant_type === "authorization_code" &&
    "code" in body &&
    typeof body.code === "string" &&
    "client_id" in body &&
    typeof body.client_id === "string" &&
    "redirect_uri" in body &&
    typeof body.redirect_uri === "string" &&
    "code_verifier" in body &&
    typeof body.code_verifier === "string"
  );
};

export const token: HttpRoute = {
  url: "/identity/oauth/token",
  method: "POST",
  schema: {
    tags: ["oauth"],
    summary: "OAuth token",
    description:
      "Exchange an authorization code for access (and optional refresh/id) tokens and set them as HTTP-only cookies",
    operationId: "exchangeToken",
    body: TokenBodySchema,
    response: {
      200: TokenResponseSchema,
    },
  },
  handler: async (request) => {
    if (!isTokenBody(request.body)) {
      throw new Error("Invalid token body");
    }

    const service = container.get<IOAuthService>(TYPES.OAuthService);
    const result = await service.exchangeToken({
      grantType: request.body.grant_type,
      code: request.body.code,
      clientId: request.body.client_id,
      redirectUri: request.body.redirect_uri,
      codeVerifier: request.body.code_verifier,
    });

    const tokenCookieOptions: Omit<HttpResponseCookie, "name" | "value"> = {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true,
    };

    const accessExpires =
      typeof result.expiresIn === "number"
        ? new Date(Date.now() + result.expiresIn * 1000)
        : undefined;

    const cookies = [
      {
        name: "accessToken",
        value: result.accessToken,
        ...tokenCookieOptions,
        ...(accessExpires ? { expires: accessExpires } : {}),
      },
      ...(result.refreshToken
        ? [
            {
              name: "refreshToken",
              value: result.refreshToken,
              ...tokenCookieOptions,
            },
          ]
        : []),
      ...(result.idToken
        ? [
            {
              name: "idToken",
              value: result.idToken,
              ...tokenCookieOptions,
              ...(accessExpires ? { expires: accessExpires } : {}),
            },
          ]
        : []),
    ];

    const response: TokenResponse = {
      message: "Tokens issued successfully.",
    };

    return {
      ...json(response),
      cookies,
    };
  },
};
