import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { PlatformMember } from "@/db";
import { PlatformRoleObject } from "@/features/platformRoles/graphql/objects/PlatformRoleObject";
import type { IPlatformRoleRepository } from "@/features/platformRoles/repositories";

export const PlatformMemberObject = builder.objectRef<PlatformMember>(
  "PlatformMemberObject",
);

PlatformMemberObject.implement({
  fields: (t) => ({
    id: t.exposeString("id"),
    platformRoleId: t.exposeString("platformRoleId"),
    identityId: t.exposeString("identityId"),
    assignedBy: t.exposeString("assignedBy", { nullable: true }),
    assignedAt: t.expose("assignedAt", { type: "DateTimeISO" }),
    expiresAt: t.expose("expiresAt", { type: "DateTimeISO", nullable: true }),
    reason: t.exposeString("reason", { nullable: true }),
    createdAt: t.expose("createdAt", { type: "DateTimeISO" }),
    updatedAt: t.expose("updatedAt", { type: "DateTimeISO", nullable: true }),
    platformRole: t.field({
      type: PlatformRoleObject,
      nullable: true,
      resolve: async (assignment) => {
        const repository = container.get<IPlatformRoleRepository>(
          TYPES.PlatformRoleRepository,
        );
        return repository.findById(assignment.platformRoleId);
      },
    }),
  }),
});
