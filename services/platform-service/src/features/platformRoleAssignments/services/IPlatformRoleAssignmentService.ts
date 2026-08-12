import type { PlatformRoleAssignment } from "@/db";

export type CreatePlatformRoleAssignmentInput = {
  platformRoleId: string;
  identityId: string;
  expiresAt?: Date | null;
  reason?: string | null;
};

export type UpdatePlatformRoleAssignmentInput = {
  expiresAt?: Date | null;
  reason?: string | null;
};

export type ListPlatformRoleAssignmentsInput = {
  platformRoleId?: string;
  identityId?: string;
};

export interface IPlatformRoleAssignmentService {
  createPlatformRoleAssignment: (
    input: CreatePlatformRoleAssignmentInput,
    userId: string,
  ) => Promise<PlatformRoleAssignment>;
  getPlatformRoleAssignmentById: (
    id: string,
    userId: string,
  ) => Promise<PlatformRoleAssignment>;
  listPlatformRoleAssignments: (
    input: ListPlatformRoleAssignmentsInput,
    userId: string,
  ) => Promise<PlatformRoleAssignment[]>;
  updatePlatformRoleAssignment: (
    id: string,
    input: UpdatePlatformRoleAssignmentInput,
    userId: string,
  ) => Promise<PlatformRoleAssignment>;
  deletePlatformRoleAssignment: (id: string, userId: string) => Promise<void>;
}
