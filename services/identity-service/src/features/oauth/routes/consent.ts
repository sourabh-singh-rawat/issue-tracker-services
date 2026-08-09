import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { IOAuthService } from "@/features/oauth/services";
import { ConsentQuerySchema, ConsentResponseSchema } from "@/features/oauth/schemas";

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

export const consent: HttpRoute = {
  url: "/identity/oauth/consent",
  method: "GET",
  schema: {
    tags: ["oauth"],
    summary: "OAuth consent challenge",
    description: "Load OAuth consent challenge details by consent_challenge",
    operationId: "getConsentChallenge",
    querystring: ConsentQuerySchema,
    response: {
      200: ConsentResponseSchema,
    },
  },
  handler: async (request) => {
    const challenge = readQueryString(request.query, "consent_challenge");
    if (challenge === undefined) {
      throw new Error("Missing consent_challenge query parameter");
    }

    const service = container.get<IOAuthService>(TYPES.OAuthService);
    const result = await service.getConsentChallenge(challenge);

    return json(result);
  },
};
