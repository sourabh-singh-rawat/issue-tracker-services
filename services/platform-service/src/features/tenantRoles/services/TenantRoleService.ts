import {
  TENANT,
  findTenantRoleDefinition,
  tenantRolePermissionKeys,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import {
  createCloudEvent,
  TenantRolePermissionsUpdatedEvent,
} from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { DbClient, TenantRole } from "@/db";
import { catalogPermissionsFromKeys } from "@/features/roles/catalogPermissions";
import {
  isCustomStoredRole,
  tenantSystemRoles,
  toTenantSystemRole,
} from "@/features/roles/systemRoles";
import { TenantNotFoundError } from "@/features/tenants/errors";
import type { ITenantRepository } from "@/features/tenants/repositories";
import { TenantRoleNotFoundError } from "@/features/tenantRoles/errors";
import type { ITenantRoleRepository } from "@/features/tenantRoles/repositories";
import type { ITenantRoleService } from "@/features/tenantRoles/services/ITenantRoleService";

export const scheduleTenantRolePermissionsUpdated = async (
  outboxService: IOutboxService,
  roleId: string,
  roleKey: string,
  options?: { tx: DbClient },
): Promise<void> => {
  const permissionKeys = [...tenantRolePermissionKeys({ key: roleKey })];
  if (permissionKeys.length === 0) {
    return;
  }

  const event = createCloudEvent({
    type: TenantRolePermissionsUpdatedEvent.type,
    version: TenantRolePermissionsUpdatedEvent.version,
    schema: TenantRolePermissionsUpdatedEvent.schema,
    source: "pine/platform-service",
    subject: roleId,
    data: {
      roleId,
      permissionKeys,
    },
  });

  await outboxService.schedule(
    {
      eventId: event.id,
      eventType: event.type,
      eventVersion: TenantRolePermissionsUpdatedEvent.version,
      aggregateType: "tenant_role",
      aggregateId: roleId,
      payload: event,
    },
    options,
  );
};

@injectable()
export class TenantRoleService implements ITenantRoleService {
  constructor(
    @inject(TYPES.TenantRoleRepository)
    private readonly tenantRoleRepository: ITenantRoleRepository,
    @inject(TYPES.TenantRepository)
    private readonly tenantRepository: ITenantRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async getTenantRoleById(id: string, userId: string): Promise<TenantRole> {
    const definition = findTenantRoleDefinition({ id });
    if (definition) {
      return toTenantSystemRole(definition, "");
    }

    const role = await this.tenantRoleRepository.findById(id);
    if (!role || !isCustomStoredRole(role)) {
      throw new TenantRoleNotFoundError(`Tenant role not found: ${id}`);
    }

    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: TENANT.name,
      id: role.tenantId,
    });

    return role;
  }

  async listTenantRoles(tenantId: string, userId: string): Promise<TenantRole[]> {
    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: TENANT.name,
      id: tenantId,
    });

    const tenant = await this.tenantRepository.findById(tenantId);
    if (!tenant) {
      throw new TenantNotFoundError(`Tenant not found: ${tenantId}`);
    }

    const custom = (await this.tenantRoleRepository.findByTenantId(tenantId)).filter(
      isCustomStoredRole,
    );

    return [...tenantSystemRoles(tenantId), ...custom];
  }

  getPermissionsForTenantRole = (role: TenantRole) =>
    catalogPermissionsFromKeys(tenantRolePermissionKeys({ key: role.key }));
}
