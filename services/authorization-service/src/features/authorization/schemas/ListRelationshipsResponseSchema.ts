import Type from "typebox";
import { GraphRelationshipBodySchema } from "@/features/authorization/schemas/GraphRelationshipBodySchema";

export const ListRelationshipsResponseSchema = Type.Object(
  {
    relationships: Type.Array(GraphRelationshipBodySchema),
  },
  { additionalProperties: false },
);

export type ListRelationshipsResponse = Type.Static<typeof ListRelationshipsResponseSchema>;
