import Type from "typebox";
import { GraphNamespaceSchema } from "@/features/authorization/schemas/GraphNamespaceSchema";

export const CheckRelationshipBodySchema = Type.Object(
  {
    namespace: GraphNamespaceSchema,
    object: Type.String({ minLength: 1 }),
    relation: Type.String({ minLength: 1 }),
    subject: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type CheckRelationshipBody = Type.Static<typeof CheckRelationshipBodySchema>;
