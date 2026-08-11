import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import Value from "typebox/value";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import { InvalidCheckRelationshipBodyError } from "@/features/authorization/errors";
import type { IAuthorizationService } from "@/features/authorization/services";
import {
  CheckRelationshipBodySchema,
  CheckRelationshipResponseSchema,
  type CheckRelationshipResponse,
} from "@/features/authorization/schemas";

export const checkRelationship: HttpRoute = {
  url: "/authorization/checkRelationship",
  method: "POST",
  schema: {
    tags: ["authorization"],
    summary: "Check a graph relationship",
    description:
      "Verify whether a subject has a relation to an object in the authorization graph (Ory Keto). Capability checks use object type capability, relation has, and object id as the capability key (e.g. product:brand:create).",
    operationId: "checkRelationship",
    body: CheckRelationshipBodySchema,
    response: {
      200: CheckRelationshipResponseSchema,
    },
  },
  handler: async (request) => {
    const body = request.body;
    if (!Value.Check(CheckRelationshipBodySchema, body)) {
      throw new InvalidCheckRelationshipBodyError();
    }

    const service = container.get<IAuthorizationService>(TYPES.AuthorizationService);
    const allowed = await service.hasRelationship({
      object: body.object,
      relation: body.relation,
      subject: body.subject,
    });

    const response: CheckRelationshipResponse = { allowed };
    return json(response);
  },
};
