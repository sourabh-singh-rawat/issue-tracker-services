import { createCloudEvent, RoleAssignmentCreatedEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, RoleAssignment } from "@/db";
import { RoleNotFoundError } from "@/features/roles/errors";
import type {
  IRoleAssignmentRepository,
  IRoleRepository,
} from "@/features/roles/repositories";
import type {
  AssignRoleInput,
  IRoleAssignmentService,
} from "@/features/roles/services/IRoleAssignmentService";

@injectable()
export class RoleAssignmentService implements IRoleAssignmentService {
  constructor(
    @inject(TYPES.Database)
    private readonly db: Database,
    @inject(TYPES.RoleAssignmentRepository)
    private readonly roleAssignmentRepository: IRoleAssignmentRepository,
    @inject(TYPES.RoleRepository)
    private readonly roleRepository: IRoleRepository,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
  ) {}

  async assignRole(input: AssignRoleInput): Promise<RoleAssignment> {
    const role = await this.roleRepository.findById(input.roleId);
    if (!role) {
      throw new RoleNotFoundError(`Role not found: ${input.roleId}`);
    }

    return this.db.transaction(async (tx) => {
      const { assignment, created } = await this.roleAssignmentRepository.ensure(
        {
          roleId: role.id,
          identityType: input.identityType,
          identityId: input.identityId,
          assignedBy: input.assignedBy,
          expiresAt: input.expiresAt,
          reason: input.reason,
        },
        { tx },
      );

      if (created) {
        const event = createCloudEvent({
          type: RoleAssignmentCreatedEvent.type,
          version: RoleAssignmentCreatedEvent.version,
          schema: RoleAssignmentCreatedEvent.schema,
          source: "pine/authorization-service",
          subject: assignment.id,
          data: {
            id: assignment.id,
            roleId: assignment.roleId,
            identityType: assignment.identityType,
            identityId: assignment.identityId,
            assignedBy: assignment.assignedBy,
            assignedAt: assignment.assignedAt.toISOString(),
            expiresAt: assignment.expiresAt?.toISOString() ?? null,
            revokedAt: assignment.revokedAt?.toISOString() ?? null,
            reason: assignment.reason,
          },
        });

        await this.outboxService.schedule(
          {
            eventId: event.id,
            eventType: event.type,
            eventVersion: RoleAssignmentCreatedEvent.version,
            aggregateType: "role_assignment",
            aggregateId: assignment.id,
            payload: event,
          },
          { tx },
        );
      }

      return assignment;
    });
  }

  async getAssignment(
    identityType: string,
    identityId: string,
    roleId: string,
  ): Promise<RoleAssignment | null> {
    return this.roleAssignmentRepository.findByIdentityAndRole(
      identityType,
      identityId,
      roleId,
    );
  }
}
