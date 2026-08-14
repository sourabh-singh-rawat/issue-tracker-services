import {
  PLATFORM_RESOURCE,
  findPlatformRoleDefinition,
  platformRolePermissionKeys,
  requirePermission,
  type IAuthorizationClient,
} from "@pine/authorization";
import {
  createCloudEvent,
  PlatformRolePermissionsUpdatedEvent,
} from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { DbClient, PlatformRole } from "@/db";
import { catalogPermissionsFromKeys } from "@/features/roles/catalogPermissions";
import {
  isCustomStoredRole,
  platformSystemRoles,
  toPlatformSystemRole,
} from "@/features/roles/systemRoles";
import {
  PlatformRoleKeyConflictError,
  PlatformRoleNameConflictError,
  PlatformRoleNotFoundError,
  PlatformRoleSystemProtectedError,
} from "@/features/platformRoles/errors";
import type { IPlatformRoleRepository } from "@/features/platformRoles/repositories";
import type {
  CreatePlatformRoleInput,
  IPlatformRoleService,
  UpdatePlatformRoleInput,
} from "@/features/platformRoles/services/IPlatformRoleService";

export const schedulePlatformRolePermissionsUpdated = async (
  outboxService: IOutboxService,
  roleId: string,
  roleKey: string,
  options?: { tx: DbClient },
): Promise<void> => {
  const permissionKeys = [...platformRolePermissionKeys({ id: roleId, key: roleKey })];
  if (permissionKeys.length === 0) {
    return;
  }

  const event = createCloudEvent({
    type: PlatformRolePermissionsUpdatedEvent.type,
    version: PlatformRolePermissionsUpdatedEvent.version,
    schema: PlatformRolePermissionsUpdatedEvent.schema,
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
      eventVersion: PlatformRolePermissionsUpdatedEvent.version,
      aggregateType: "platform_role",
      aggregateId: roleId,
      payload: event,
    },
    options,
  );
};

@injectable()
export class PlatformRoleService implements IPlatformRoleService {
  constructor(
    @inject(TYPES.PlatformRoleRepository)
    private readonly platformRoleRepository: IPlatformRoleRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async createPlatformRole(
    input: CreatePlatformRoleInput,
    userId: string,
  ): Promise<PlatformRole> {
    await requirePermission(this.authorizationClient, userId, "manage_admins", {
      namespace: PLATFORM_RESOURCE.name,
      id: input.platformId,
    });

    if (findPlatformRoleDefinition({ key: input.key })) {
      throw new PlatformRoleKeyConflictError(`Platform role key already exists: ${input.key}`);
    }

    const keyExists = await this.platformRoleRepository.existsByKey(input.key);
    if (keyExists) {
      throw new PlatformRoleKeyConflictError(`Platform role key already exists: ${input.key}`);
    }

    const nameExists = await this.platformRoleRepository.existsByName(input.name);
    if (nameExists) {
      throw new PlatformRoleNameConflictError(
        `Platform role name already exists: ${input.name}`,
      );
    }

    return this.platformRoleRepository.save({
      key: input.key,
      name: input.name,
      description: input.description,
    });
  }

  async getPlatformRoleById(
    id: string,
    platformId: string,
    userId: string,
  ): Promise<PlatformRole> {
    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: PLATFORM_RESOURCE.name,
      id: platformId,
    });

    const definition = findPlatformRoleDefinition({ id });
    if (definition) {
      return toPlatformSystemRole(definition);
    }

    const role = await this.platformRoleRepository.findById(id);
    if (!role || !isCustomStoredRole(role)) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }

    return role;
  }

  async listPlatformRoles(platformId: string, userId: string): Promise<PlatformRole[]> {
    await requirePermission(this.authorizationClient, userId, "read", {
      namespace: PLATFORM_RESOURCE.name,
      id: platformId,
    });

    const custom = (await this.platformRoleRepository.findAll()).filter(isCustomStoredRole);
    return [...platformSystemRoles(), ...custom];
  }

  getPermissionsForPlatformRole = (role: PlatformRole) =>
    catalogPermissionsFromKeys(platformRolePermissionKeys(role));

  async updatePlatformRole(
    id: string,
    input: UpdatePlatformRoleInput,
    platformId: string,
    userId: string,
  ): Promise<PlatformRole> {
    await requirePermission(this.authorizationClient, userId, "manage_admins", {
      namespace: PLATFORM_RESOURCE.name,
      id: platformId,
    });

    if (findPlatformRoleDefinition({ id })) {
      throw new PlatformRoleSystemProtectedError(
        `System platform role cannot be updated: ${id}`,
      );
    }

    const existing = await this.platformRoleRepository.findById(id);
    if (!existing || !isCustomStoredRole(existing)) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }

    if (input.name !== undefined && input.name !== existing.name) {
      const nameExists = await this.platformRoleRepository.existsByName(input.name, id);
      if (nameExists) {
        throw new PlatformRoleNameConflictError(
          `Platform role name already exists: ${input.name}`,
        );
      }
    }

    if (input.name === undefined && input.description === undefined) {
      return existing;
    }

    const updated = await this.platformRoleRepository.update(id, {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
    });

    if (!updated) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }

    return updated;
  }

  async deletePlatformRole(id: string, platformId: string, userId: string): Promise<void> {
    await requirePermission(this.authorizationClient, userId, "manage_admins", {
      namespace: PLATFORM_RESOURCE.name,
      id: platformId,
    });

    if (findPlatformRoleDefinition({ id })) {
      throw new PlatformRoleSystemProtectedError(
        `System platform role cannot be deleted: ${id}`,
      );
    }

    const existing = await this.platformRoleRepository.findById(id);
    if (!existing || !isCustomStoredRole(existing)) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }

    const deleted = await this.platformRoleRepository.softDelete(id);
    if (!deleted) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }
  }
}
