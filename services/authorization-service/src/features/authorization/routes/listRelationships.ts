import type { HttpRoute } from "@pine/server";
import { json } from "@pine/server";
import Value from "typebox/value";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import { InvalidGraphRelationshipBodyError } from "@/features/authorization/errors";
import type { IAuthorizationService } from "@/features/authorization/services";
import {
  ListRelationshipsBodySchema,
  ListRelationshipsResponseSchema,
  type ListRelationshipsResponse,
} from "@/features/authorization/schemas";

export const listRelationships: HttpRoute = {
  url: "/authorization/listRelationships",
  method: "POST",
  schema: {
    tags: ["authorization"],
    summary: "List graph relationships",
    description: "List stored relationships for an object in the authorization graph.",
    operationId: "listRelationships",
    body: ListRelationshipsBodySchema,
    response: {
      200: ListRelationshipsResponseSchema,
    },
  },
  handler: async (request) => {
    const body = request.body;
    if (!Value.Check(ListRelationshipsBodySchema, body)) {
      throw new InvalidGraphRelationshipBodyError();
    }

    const service = container.get<IAuthorizationService>(TYPES.AuthorizationService);
    const relationships = await service.listRelationships({
      namespace: body.namespace,
      object: body.object,
      relation: body.relation,
    });

    const response: ListRelationshipsResponse = { relationships };
    return json(response);
  },
};
