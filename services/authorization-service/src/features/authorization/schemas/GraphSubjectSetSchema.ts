import Type from "typebox";
import { GraphNamespaceSchema } from "@/features/authorization/schemas/GraphNamespaceSchema";

export const GraphSubjectSetSchema = Type.Object(
  {
    namespace: GraphNamespaceSchema,
    id: Type.String({ minLength: 1 }),
    relation: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type GraphSubjectSetBody = Type.Static<typeof GraphSubjectSetSchema>;
