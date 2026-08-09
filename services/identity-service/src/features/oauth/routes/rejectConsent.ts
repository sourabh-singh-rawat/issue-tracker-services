import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import {
  ConsentActionResponseSchema,
  ConsentQuerySchema,
  RejectConsentBodySchema,
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

function isRejectConsentBody(
  body: unknown,
): body is { error?: string; errorDescription?: string } {
  return body !== null && typeof body === "object";
}

export const rejectConsent: HttpRoute = {
  url: "/identity/oauth/consent/reject",
  method: "POST",
  schema: {
    tags: ["oauth"],
    summary: "Reject OAuth consent",
    description: "Reject an OAuth consent challenge when the user denies access",
    operationId: "rejectConsentChallenge",
    querystring: ConsentQuerySchema,
    body: RejectConsentBodySchema,
    response: {
      200: ConsentActionResponseSchema,
    },
  },
  handler: async (request) => {
    const challenge = readQueryString(request.query, "consent_challenge");
    if (challenge === undefined) {
      throw new Error("Missing consent_challenge query parameter");
    }
    if (!isRejectConsentBody(request.body)) {
      throw new Error("Invalid reject consent body");
    }

    const service = container.get<IOAuthService>(TYPES.OAuthService);
    const result = await service.rejectConsent({
      challenge,
      error:
        "error" in request.body && typeof request.body.error === "string"
          ? request.body.error
          : undefined,
      errorDescription:
        "errorDescription" in request.body && typeof request.body.errorDescription === "string"
          ? request.body.errorDescription
          : undefined,
    });

    return json(result);
  },
};
