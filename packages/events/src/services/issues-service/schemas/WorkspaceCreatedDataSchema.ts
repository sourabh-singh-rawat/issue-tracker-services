import Type from "typebox";

export const WorkspaceCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    ownerId: Type.String(),
    member: Type.Object(
      {
        userId: Type.String(),
        workspaceId: Type.String(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export type WorkspaceCreatedData = Type.Static<typeof WorkspaceCreatedDataSchema>;
