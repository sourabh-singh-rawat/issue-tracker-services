import Type from "typebox";

export const IssueCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    ownerId: Type.String(),
    reporterId: Type.String(),
    projectId: Type.String(),
    createdAt: Type.String(),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type IssueCreatedData = Type.Static<typeof IssueCreatedDataSchema>;
