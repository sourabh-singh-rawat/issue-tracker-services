import {
  TENANTS,
  TENANT_ROLES,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import {
  CloudEvent,
  createCloudEvent,
  TenantCreatedEvent,
  type TenantCreatedData,
} from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Tenant } from "@/db";
import type { ITenantMemberRepository } from "@/features/tenantMembers/repositories";
import { TenantRoleNotFoundError } from "@/features/tenantRoles/errors";
import type { ITenantRoleRepository } from "@/features/tenantRoles/repositories";
import {
  TenantNameConflictError,
  TenantNotFoundError,
  TenantSlugConflictError,
} from "@/features/tenants/errors";
import type { ITenantRepository } from "@/features/tenants/repositories";
import type { CreateTenantInput, ITenantService } from "@/features/tenants/services/ITenantService";

@injectable()
export class TenantService implements ITenantService {
  constructor(
    @inject(TYPES.TenantRepository)
    private readonly tenantRepository: ITenantRepository,
    @inject(TYPES.TenantRoleRepository)
    private readonly tenantRoleRepository: ITenantRoleRepository,
    @inject(TYPES.TenantMemberRepository)
    private readonly tenantMemberRepository: ITenantMemberRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createTenant(input: CreateTenantInput, userId: string): Promise<Tenant> {
    await requireCapability(this.authorizationClient, userId, TENANTS.CREATE.key);

    const slugExists = await this.tenantRepository.existsBySlug(input.slug);
    if (slugExists) {
      throw new TenantSlugConflictError(`Tenant slug already exists: ${input.slug}`);
    }

    const nameExists = await this.tenantRepository.existsByName(input.name);
    if (nameExists) {
      throw new TenantNameConflictError(`Tenant name already exists: ${input.name}`);
    }

    return this.db.transaction(async (tx) => {
      const tenant = await this.tenantRepository.save(
        {
          name: input.name,
          slug: input.slug,
          description: input.description,
          isActive: input.isActive,
        },
        { tx },
      );

      const systemRoles = await this.tenantRoleRepository.seedSystemRoles(tenant.id, { tx });

      const ownerRole = systemRoles.find((role) => role.key === TENANT_ROLES.TENANT_OWNER.key);
      if (!ownerRole) {
        throw new TenantRoleNotFoundError(
          `Tenant owner role not found for tenant: ${tenant.id}`,
        );
      }

      await this.tenantMemberRepository.save(
        {
          tenantId: tenant.id,
          roleId: ownerRole.id,
          identityId: userId,
          assignedBy: userId,
        },
        { tx },
      );

      const event: CloudEvent<TenantCreatedData> = createCloudEvent({
        type: TenantCreatedEvent.type,
        version: TenantCreatedEvent.version,
        schema: TenantCreatedEvent.schema,
        source: "pine/platform-service",
        subject: tenant.id,
        data: {
          id: tenant.id,
          name: tenant.name,
          slug: tenant.slug,
          isActive: tenant.isActive,
          version: tenant.version,
          createdAt: tenant.createdAt.toISOString(),
          ...(tenant.description != null ? { description: tenant.description } : {}),
        },
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: TenantCreatedEvent.version,
          aggregateType: "tenant",
          aggregateId: tenant.id,
          payload: event,
        },
        { tx },
      );

      return tenant;
    });
  }

  async getTenantById(id: string, userId: string): Promise<Tenant> {
    await requireCapability(this.authorizationClient, userId, TENANTS.READ.key);

    const tenant = await this.tenantRepository.findById(id);
    if (!tenant) {
      throw new TenantNotFoundError(`Tenant not found: ${id}`);
    }

    return tenant;
  }

  async listTenants(userId: string): Promise<Tenant[]> {
    await requireCapability(this.authorizationClient, userId, TENANTS.READ.key);

    return this.tenantRepository.findAll();
  }

  async deleteTenant(id: string, userId: string): Promise<void> {
    await requireCapability(this.authorizationClient, userId, TENANTS.SUSPEND.key);

    const deleted = await this.tenantRepository.softDelete(id);
    if (!deleted) {
      throw new TenantNotFoundError(`Tenant not found: ${id}`);
    }
  }
}
