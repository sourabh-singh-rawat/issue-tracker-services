import Type from "typebox";
import { GraphNamespaceSchema } from "@/features/authorization/schemas/GraphNamespaceSchema";

export const GraphResourceSchema = Type.Object(
  {
    namespace: GraphNamespaceSchema,
    id: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type GraphResourceBody = Type.Static<typeof GraphResourceSchema>;
