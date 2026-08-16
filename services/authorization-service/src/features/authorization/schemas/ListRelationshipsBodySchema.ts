import Type from "typebox";
import { GraphNamespaceSchema } from "@/features/authorization/schemas/GraphNamespaceSchema";

export const ListRelationshipsBodySchema = Type.Object(
  {
    namespace: GraphNamespaceSchema,
    object: Type.String({ minLength: 1 }),
    relation: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type ListRelationshipsBody = Type.Static<typeof ListRelationshipsBodySchema>;
