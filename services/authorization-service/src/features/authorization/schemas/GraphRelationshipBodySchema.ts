import Type from "typebox";
import { GraphResourceSchema } from "@/features/authorization/schemas/GraphResourceSchema";
import { GraphSubjectSetSchema } from "@/features/authorization/schemas/GraphSubjectSetSchema";

export const GraphRelationshipBodySchema = Type.Object(
  {
    object: GraphResourceSchema,
    relation: Type.String({ minLength: 1 }),
    subject: Type.Optional(GraphResourceSchema),
    subjectSet: Type.Optional(GraphSubjectSetSchema),
  },
  { additionalProperties: false },
);

export type GraphRelationshipBody = Type.Static<typeof GraphRelationshipBodySchema>;
