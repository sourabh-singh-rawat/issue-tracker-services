import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Role } from "@/db";
import { CapabilityNotFoundError } from "@/features/capabilities/errors";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
import {
  RoleKeyConflictError,
  RoleNameConflictError,
  RoleNotFoundError,
} from "@/features/roles/errors";
import type { IRoleCapabilityRepository, IRoleRepository } from "@/features/roles/repositories";
import type {
  CreateRoleInput,
  IRoleService,
  UpdateRoleInput,
} from "@/features/roles/services/IRoleService";

@injectable()
export class RoleService implements IRoleService {
  constructor(
    @inject(TYPES.Database)
    private readonly db: Database,
    @inject(TYPES.RoleRepository)
    private readonly roleRepository: IRoleRepository,
    @inject(TYPES.RoleCapabilityRepository)
    private readonly roleCapabilityRepository: IRoleCapabilityRepository,
    @inject(TYPES.CapabilityRepository)
    private readonly capabilityRepository: ICapabilityRepository,
  ) {}

  private async resolveCapabilityIdsByKeys(capabilityKeys: string[]): Promise<string[]> {
    if (capabilityKeys.length === 0) {
      return [];
    }

    const capabilities = await this.capabilityRepository.findByKeys(capabilityKeys);
    const foundKeys = new Set(capabilities.map((capability) => capability.key));
    const missingKeys = capabilityKeys.filter((key) => !foundKeys.has(key));

    if (missingKeys.length > 0) {
      throw new CapabilityNotFoundError(`Capability(ies) not found: ${missingKeys.join(", ")}`);
    }

    const byKey = new Map(capabilities.map((capability) => [capability.key, capability.id]));
    return capabilityKeys.map((key) => byKey.get(key)!);
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
    const capabilityIds = await this.resolveCapabilityIdsByKeys(capabilityKeys);

    return this.db.transaction(async (tx) => {
      const role = await this.roleRepository.save(
        {
          key: input.key,
          name: input.name,
          description: input.description,
        },
        { tx },
      );

      if (capabilityIds.length > 0) {
        await this.roleCapabilityRepository.saveMany(
          capabilityIds.map((capabilityId) => ({
            roleId: role.id,
            capabilityId,
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

    let capabilityIds: string[] = [];
    if (shouldSyncCapabilities) {
      capabilityIds = await this.resolveCapabilityIdsByKeys(capabilityKeys);
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
        await this.roleCapabilityRepository.syncForRole(id, capabilityIds, { tx });
      }

      return role;
    });
  }
}
