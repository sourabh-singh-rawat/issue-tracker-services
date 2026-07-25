import Type from "typebox";

export const ProjectDataSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    status: Type.String(),
    ownerUserId: Type.String(),
    workspaceId: Type.String(),
    createdAt: Type.String(),
    description: Type.Optional(Type.String()),
    startDate: Type.Optional(Type.String()),
    endDate: Type.Optional(Type.String()),
    updatedAt: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type ProjectData = Type.Static<typeof ProjectDataSchema>;
