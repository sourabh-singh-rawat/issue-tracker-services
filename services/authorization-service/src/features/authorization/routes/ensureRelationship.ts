import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import Value from "typebox/value";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import { InvalidGraphRelationshipBodyError } from "@/features/authorization/errors";
import type { IAuthorizationService } from "@/features/authorization/services";
import {
  EnsureRelationshipResponseSchema,
  GraphRelationshipBodySchema,
  type EnsureRelationshipResponse,
} from "@/features/authorization/schemas";

export const ensureRelationship: HttpRoute = {
  url: "/authorization/ensureRelationship",
  method: "POST",
  schema: {
    tags: ["authorization"],
    summary: "Ensure a graph relationship exists",
    description:
      "Idempotently create a relationship in the authorization graph (Ory Keto). Used by domain services to grant capabilities and role assignees.",
    operationId: "ensureRelationship",
    body: GraphRelationshipBodySchema,
    response: {
      200: EnsureRelationshipResponseSchema,
    },
  },
  handler: async (request) => {
    const body = request.body;
    if (!Value.Check(GraphRelationshipBodySchema, body)) {
      throw new InvalidGraphRelationshipBodyError();
    }

    const hasSubject = body.subject !== undefined;
    const hasSubjectSet = body.subjectSet !== undefined;
    if (hasSubject === hasSubjectSet) {
      throw new InvalidGraphRelationshipBodyError(
        "Graph relationship requires exactly one of subject or subjectSet",
      );
    }

    const service = container.get<IAuthorizationService>(TYPES.AuthorizationService);
    const result = await service.ensureRelationship({
      object: body.object,
      relation: body.relation,
      subject: body.subject,
      subjectSet: body.subjectSet,
    });

    const response: EnsureRelationshipResponse = { created: result.created };
    return json(response);
  },
};
