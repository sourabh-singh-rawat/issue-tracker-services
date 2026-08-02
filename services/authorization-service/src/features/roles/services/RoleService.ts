import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Role } from "@/db";
import { PermissionNotFoundError } from "@/features/permissions/errors";
import type { IResourceRepository } from "@/features/resources/repositories";
import {
  RoleKeyConflictError,
  RoleNameConflictError,
  RoleNotFoundError,
} from "@/features/roles/errors";
import type { IRoleRepository, IRoleResourceRepository } from "@/features/roles/repositories";
import type {
  CreateRoleInput,
  IRoleService,
  UpdateRoleInput,
} from "@/features/roles/services/IRoleService";

const DEFAULT_CAPABILITY_RELATION = "has";

@injectable()
export class RoleService implements IRoleService {
  constructor(
    @inject(TYPES.Database)
    private readonly db: Database,
    @inject(TYPES.RoleRepository)
    private readonly roleRepository: IRoleRepository,
    @inject(TYPES.RoleResourceRepository)
    private readonly roleResourceRepository: IRoleResourceRepository,
    @inject(TYPES.ResourceRepository)
    private readonly resourceRepository: IResourceRepository,
  ) {}

  private async resolveResourceIdsByKeys(resourceKeys: string[]): Promise<string[]> {
    if (resourceKeys.length === 0) {
      return [];
    }

    const resources = await this.resourceRepository.findByKeys(resourceKeys);
    const foundKeys = new Set(resources.map((resource) => resource.key));
    const missingKeys = resourceKeys.filter((key) => !foundKeys.has(key));

    if (missingKeys.length > 0) {
      throw new PermissionNotFoundError(
        `Capability resource(s) not found: ${missingKeys.join(", ")}`,
      );
    }

    const byKey = new Map(resources.map((resource) => [resource.key, resource.id]));
    return resourceKeys.map((key) => byKey.get(key)!);
  }

  async createRole(input: CreateRoleInput): Promise<Role> {
    const keyExists = await this.roleRepository.existsByKey(input.key);
    if (keyExists) {
      throw new RoleKeyConflictError(`Role key already exists: ${input.key}`);
    }

    const nameExists = await this.roleRepository.existsByName(input.name);
    if (nameExists) {
      throw new RoleNameConflictError(`Role name already exists: ${input.name}`);
    }

    const capabilityKeys = [...new Set(input.capabilityKeys ?? [])];
    const resourceIds = await this.resolveResourceIdsByKeys(capabilityKeys);

    return this.db.transaction(async (tx) => {
      const role = await this.roleRepository.save(
        {
          key: input.key,
          name: input.name,
          description: input.description,
        },
        { tx },
      );

      if (resourceIds.length > 0) {
        await this.roleResourceRepository.saveMany(
          resourceIds.map((resourceId) => ({
            roleId: role.id,
            resourceId,
            relation: DEFAULT_CAPABILITY_RELATION,
          })),
          { tx },
        );
      }

      return role;
    });
  }

  async getRoleById(id: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleNotFoundError(`Role not found: ${id}`);
    }

    return role;
  }

  async getRoles(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async updateRole(id: string, input: UpdateRoleInput): Promise<Role> {
    const existing = await this.roleRepository.findById(id);
    if (!existing) {
      throw new RoleNotFoundError(`Role not found: ${id}`);
    }

    if (input.name !== undefined && input.name !== existing.name) {
      const nameExists = await this.roleRepository.existsByName(input.name, id);
      if (nameExists) {
        throw new RoleNameConflictError(`Role name already exists: ${input.name}`);
      }
    }

    const shouldSyncCapabilities = input.capabilityKeys !== undefined;
    const capabilityKeys = shouldSyncCapabilities ? [...new Set(input.capabilityKeys)] : [];

    let resourceIds: string[] = [];
    if (shouldSyncCapabilities) {
      resourceIds = await this.resolveResourceIdsByKeys(capabilityKeys);
    }

    const hasRoleFieldUpdates = input.name !== undefined || input.description !== undefined;

    if (!hasRoleFieldUpdates && !shouldSyncCapabilities) {
      return existing;
    }

    return this.db.transaction(async (tx) => {
      let role = existing;

      if (hasRoleFieldUpdates) {
        role = await this.roleRepository.update(
          id,
          {
            ...(input.name !== undefined ? { name: input.name } : {}),
            ...(input.description !== undefined ? { description: input.description } : {}),
          },
          { tx },
        );
      }

      if (shouldSyncCapabilities) {
        await this.roleResourceRepository.syncForRole(
          id,
          resourceIds.map((resourceId) => ({
            resourceId,
            relation: DEFAULT_CAPABILITY_RELATION,
          })),
          { tx },
        );
      }

      return role;
    });
  }
}
