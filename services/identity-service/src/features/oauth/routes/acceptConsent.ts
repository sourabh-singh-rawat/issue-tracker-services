import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import {
  AcceptConsentBodySchema,
  ConsentActionResponseSchema,
  ConsentQuerySchema,
} from "@/features/oauth/schemas";

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

function isAcceptConsentBody(
  body: unknown,
): body is { grantScope: string[]; remember?: boolean; rememberFor?: number } {
  if (body === null || typeof body !== "object") {
    return false;
  }
  if (!("grantScope" in body)) {
    return false;
  }
  const grantScope = Reflect.get(body, "grantScope");
  return Array.isArray(grantScope) && grantScope.every((item) => typeof item === "string");
}

export const acceptConsent: HttpRoute = {
  url: "/identity/oauth/consent/accept",
  method: "POST",
  schema: {
    tags: ["oauth"],
    summary: "Accept OAuth consent",
    description: "Accept an OAuth consent challenge with granted scopes",
    operationId: "acceptConsentChallenge",
    querystring: ConsentQuerySchema,
    body: AcceptConsentBodySchema,
    response: {
      200: ConsentActionResponseSchema,
    },
  },
  handler: async (request) => {
    const challenge = readQueryString(request.query, "consent_challenge");
    if (challenge === undefined) {
      throw new Error("Missing consent_challenge query parameter");
    }
    if (!isAcceptConsentBody(request.body)) {
      throw new Error("Invalid accept consent body");
    }

    const service = container.get<IOAuthService>(TYPES.OAuthService);
    const result = await service.acceptConsent({
      challenge,
      grantScope: request.body.grantScope,
      remember:
        "remember" in request.body && typeof request.body.remember === "boolean"
          ? request.body.remember
          : undefined,
      rememberFor:
        "rememberFor" in request.body && typeof request.body.rememberFor === "number"
          ? request.body.rememberFor
          : undefined,
    });

    return json(result);
  },
};
