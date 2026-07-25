import Type from "typebox";

export const WorkspaceMemberInvitedDataSchema = Type.Object(
  {
    userId: Type.String(),
    workspaceId: Type.String(),
    workspaceName: Type.String(),
    email: Type.String({ format: "email" }),
    token: Type.String(),
    status: Type.Union([
      Type.Literal("Valid"),
      Type.Literal("Revoked"),
      Type.Literal("Expired"),
      Type.Literal("Used"),
    ]),
  },
  { additionalProperties: false },
);

export type WorkspaceMemberInvitedData = Type.Static<
  typeof WorkspaceMemberInvitedDataSchema
>;
