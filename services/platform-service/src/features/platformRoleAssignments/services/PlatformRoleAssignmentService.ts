import {
  PLATFORM_ROLE_ASSIGNMENT,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, PlatformRoleAssignment } from "@/db";
import {
  PlatformRoleAssignmentConflictError,
  PlatformRoleAssignmentNotFoundError,
} from "@/features/platformRoleAssignments/errors";
import type { IPlatformRoleAssignmentRepository } from "@/features/platformRoleAssignments/repositories";
import type {
  CreatePlatformRoleAssignmentInput,
  IPlatformRoleAssignmentService,
  ListPlatformRoleAssignmentsInput,
  UpdatePlatformRoleAssignmentInput,
} from "@/features/platformRoleAssignments/services/IPlatformRoleAssignmentService";
import { PlatformRoleNotFoundError } from "@/features/platformRoles/errors";
import type { IPlatformRoleRepository } from "@/features/platformRoles/repositories";
import {
  schedulePlatformRoleAssignmentCreated,
  schedulePlatformRoleAssignmentDeleted,
  schedulePlatformRoleCapabilitiesUpdated,
} from "@/integrations/authorization/platformRoleGraph";

@injectable()
export class PlatformRoleAssignmentService implements IPlatformRoleAssignmentService {
  constructor(
    @inject(TYPES.PlatformRoleAssignmentRepository)
    private readonly platformRoleAssignmentRepository: IPlatformRoleAssignmentRepository,
    @inject(TYPES.PlatformRoleRepository)
    private readonly platformRoleRepository: IPlatformRoleRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createPlatformRoleAssignment(
    input: CreatePlatformRoleAssignmentInput,
    userId: string,
  ): Promise<PlatformRoleAssignment> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_ROLE_ASSIGNMENT.CREATE.key,
    );

    const role = await this.platformRoleRepository.findById(input.platformRoleId);
    if (!role) {
      throw new PlatformRoleNotFoundError(
        `Platform role not found: ${input.platformRoleId}`,
      );
    }

    const existing = await this.platformRoleAssignmentRepository.findByRoleAndIdentity(
      input.platformRoleId,
      input.identityId,
    );
    if (existing) {
      throw new PlatformRoleAssignmentConflictError(
        `Platform role assignment already exists for role ${input.platformRoleId} and identity ${input.identityId}`,
      );
    }

    return this.db.transaction(async (tx) => {
      const assignment = await this.platformRoleAssignmentRepository.save(
        {
          platformRoleId: input.platformRoleId,
          identityId: input.identityId,
          assignedBy: userId,
          expiresAt: input.expiresAt,
          reason: input.reason,
        },
        { tx },
      );

      await schedulePlatformRoleCapabilitiesUpdated(
        this.outboxService,
        role.id,
        role.key,
        { tx },
      );
      await schedulePlatformRoleAssignmentCreated(this.outboxService, assignment, { tx });

      return assignment;
    });
  }

  async getPlatformRoleAssignmentById(
    id: string,
    userId: string,
  ): Promise<PlatformRoleAssignment> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_ROLE_ASSIGNMENT.READ.key,
    );

    const assignment = await this.platformRoleAssignmentRepository.findById(id);
    if (!assignment) {
      throw new PlatformRoleAssignmentNotFoundError(
        `Platform role assignment not found: ${id}`,
      );
    }

    return assignment;
  }

  async listPlatformRoleAssignments(
    input: ListPlatformRoleAssignmentsInput,
    userId: string,
  ): Promise<PlatformRoleAssignment[]> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_ROLE_ASSIGNMENT.READ.key,
    );

    if (input.platformRoleId !== undefined) {
      const role = await this.platformRoleRepository.findById(input.platformRoleId);
      if (!role) {
        throw new PlatformRoleNotFoundError(
          `Platform role not found: ${input.platformRoleId}`,
        );
      }
    }

    return this.platformRoleAssignmentRepository.findMany({
      platformRoleId: input.platformRoleId,
      identityId: input.identityId,
    });
  }

  async updatePlatformRoleAssignment(
    id: string,
    input: UpdatePlatformRoleAssignmentInput,
    userId: string,
  ): Promise<PlatformRoleAssignment> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_ROLE_ASSIGNMENT.UPDATE.key,
    );

    const existing = await this.platformRoleAssignmentRepository.findById(id);
    if (!existing) {
      throw new PlatformRoleAssignmentNotFoundError(
        `Platform role assignment not found: ${id}`,
      );
    }

    if (input.expiresAt === undefined && input.reason === undefined) {
      return existing;
    }

    const updated = await this.platformRoleAssignmentRepository.update(id, {
      ...(input.expiresAt !== undefined ? { expiresAt: input.expiresAt } : {}),
      ...(input.reason !== undefined ? { reason: input.reason } : {}),
    });

    if (!updated) {
      throw new PlatformRoleAssignmentNotFoundError(
        `Platform role assignment not found: ${id}`,
      );
    }

    return updated;
  }

  async deletePlatformRoleAssignment(id: string, userId: string): Promise<void> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_ROLE_ASSIGNMENT.DELETE.key,
    );

    const existing = await this.platformRoleAssignmentRepository.findById(id);
    if (!existing) {
      throw new PlatformRoleAssignmentNotFoundError(
        `Platform role assignment not found: ${id}`,
      );
    }

    await this.db.transaction(async (tx) => {
      const deleted = await this.platformRoleAssignmentRepository.softDelete(id, { tx });
      if (!deleted) {
        throw new PlatformRoleAssignmentNotFoundError(
          `Platform role assignment not found: ${id}`,
        );
      }

      await schedulePlatformRoleAssignmentDeleted(this.outboxService, existing, { tx });
    });
  }
}
