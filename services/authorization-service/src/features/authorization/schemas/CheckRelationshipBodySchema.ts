import Type from "typebox";
import { GraphResourceSchema } from "@/features/authorization/schemas/GraphResourceSchema";

export const CheckRelationshipBodySchema = Type.Object(
  {
    object: GraphResourceSchema,
    relation: Type.String({ minLength: 1 }),
    subject: GraphResourceSchema,
  },
  { additionalProperties: false },
);

export type CheckRelationshipBody = Type.Static<typeof CheckRelationshipBodySchema>;
