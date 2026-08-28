import Type from "typebox";
import { GraphNamespaceSchema } from "@/features/authorization/schemas/GraphNamespaceSchema";
import { GraphResourceSchema } from "@/features/authorization/schemas/GraphResourceSchema";

export const ListRelationshipsBodySchema = Type.Object(
  {
    namespace: GraphNamespaceSchema,
    object: Type.Optional(Type.String({ minLength: 1 })),
    relation: Type.Optional(Type.String({ minLength: 1 })),
    subject: Type.Optional(GraphResourceSchema),
  },
  { additionalProperties: false },
);

export type ListRelationshipsBody = Type.Static<typeof ListRelationshipsBodySchema>;
