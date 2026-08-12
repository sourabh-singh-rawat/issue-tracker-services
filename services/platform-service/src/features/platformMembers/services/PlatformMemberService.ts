import {
  PLATFORM_MEMBER,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, PlatformMember } from "@/db";
import {
  PlatformMemberConflictError,
  PlatformMemberNotFoundError,
} from "@/features/platformMembers/errors";
import type { IPlatformMemberRepository } from "@/features/platformMembers/repositories";
import type {
  CreatePlatformMemberInput,
  IPlatformMemberService,
  ListPlatformMembersInput,
  UpdatePlatformMemberInput,
} from "@/features/platformMembers/services/IPlatformMemberService";
import { PlatformRoleNotFoundError } from "@/features/platformRoles/errors";
import type { IPlatformRoleRepository } from "@/features/platformRoles/repositories";
import {
  schedulePlatformMemberCreated,
  schedulePlatformMemberDeleted,
  schedulePlatformRoleCapabilitiesUpdated,
} from "@/integrations/authorization/platformRoleGraph";

@injectable()
export class PlatformMemberService implements IPlatformMemberService {
  constructor(
    @inject(TYPES.PlatformMemberRepository)
    private readonly platformMemberRepository: IPlatformMemberRepository,
    @inject(TYPES.PlatformRoleRepository)
    private readonly platformRoleRepository: IPlatformRoleRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createPlatformMember(
    input: CreatePlatformMemberInput,
    userId: string,
  ): Promise<PlatformMember> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_MEMBER.CREATE.key,
    );

    const role = await this.platformRoleRepository.findById(input.platformRoleId);
    if (!role) {
      throw new PlatformRoleNotFoundError(
        `Platform role not found: ${input.platformRoleId}`,
      );
    }

    const existing = await this.platformMemberRepository.findByRoleAndIdentity(
      input.platformRoleId,
      input.identityId,
    );
    if (existing) {
      throw new PlatformMemberConflictError(
        `Platform member already exists for role ${input.platformRoleId} and identity ${input.identityId}`,
      );
    }

    return this.db.transaction(async (tx) => {
      const assignment = await this.platformMemberRepository.save(
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
      await schedulePlatformMemberCreated(this.outboxService, assignment, { tx });

      return assignment;
    });
  }

  async getPlatformMemberById(
    id: string,
    userId: string,
  ): Promise<PlatformMember> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_MEMBER.READ.key,
    );

    const assignment = await this.platformMemberRepository.findById(id);
    if (!assignment) {
      throw new PlatformMemberNotFoundError(
        `Platform member not found: ${id}`,
      );
    }

    return assignment;
  }

  async listPlatformMembers(
    input: ListPlatformMembersInput,
    userId: string,
  ): Promise<PlatformMember[]> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_MEMBER.READ.key,
    );

    if (input.platformRoleId !== undefined) {
      const role = await this.platformRoleRepository.findById(input.platformRoleId);
      if (!role) {
        throw new PlatformRoleNotFoundError(
          `Platform role not found: ${input.platformRoleId}`,
        );
      }
    }

    return this.platformMemberRepository.findMany({
      platformRoleId: input.platformRoleId,
      identityId: input.identityId,
    });
  }

  async updatePlatformMember(
    id: string,
    input: UpdatePlatformMemberInput,
    userId: string,
  ): Promise<PlatformMember> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_MEMBER.UPDATE.key,
    );

    const existing = await this.platformMemberRepository.findById(id);
    if (!existing) {
      throw new PlatformMemberNotFoundError(
        `Platform member not found: ${id}`,
      );
    }

    if (input.expiresAt === undefined && input.reason === undefined) {
      return existing;
    }

    const updated = await this.platformMemberRepository.update(id, {
      ...(input.expiresAt !== undefined ? { expiresAt: input.expiresAt } : {}),
      ...(input.reason !== undefined ? { reason: input.reason } : {}),
    });

    if (!updated) {
      throw new PlatformMemberNotFoundError(
        `Platform member not found: ${id}`,
      );
    }

    return updated;
  }

  async deletePlatformMember(id: string, userId: string): Promise<void> {
    await requireCapability(
      this.authorizationClient,
      userId,
      PLATFORM_MEMBER.DELETE.key,
    );

    const existing = await this.platformMemberRepository.findById(id);
    if (!existing) {
      throw new PlatformMemberNotFoundError(
        `Platform member not found: ${id}`,
      );
    }

    await this.db.transaction(async (tx) => {
      const deleted = await this.platformMemberRepository.softDelete(id, { tx });
      if (!deleted) {
        throw new PlatformMemberNotFoundError(
          `Platform member not found: ${id}`,
        );
      }

      await schedulePlatformMemberDeleted(this.outboxService, existing, { tx });
    });
  }
}
