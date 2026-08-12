import {
  ALL_PLATFORM_ROLES,
  PLATFORM_ROLE,
  requireCapability,
  type IAuthorizationClient,
} from "@pine/authorization";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Capability, PlatformRole } from "@/db";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
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

const capabilityKeysForPlatformRole = (role: PlatformRole): readonly string[] => {
  for (const definition of ALL_PLATFORM_ROLES) {
    if (definition.id === role.id || definition.key === role.key) {
      return definition.capabilityKeys;
    }
  }
  return [];
};

@injectable()
export class PlatformRoleService implements IPlatformRoleService {
  constructor(
    @inject(TYPES.PlatformRoleRepository)
    private readonly platformRoleRepository: IPlatformRoleRepository,
    @inject(TYPES.CapabilityRepository)
    private readonly capabilityRepository: ICapabilityRepository,
    @inject(TYPES.AuthorizationClient)
    private readonly authorizationClient: IAuthorizationClient,
  ) {}

  async createPlatformRole(
    input: CreatePlatformRoleInput,
    userId: string,
  ): Promise<PlatformRole> {
    await requireCapability(this.authorizationClient, userId, PLATFORM_ROLE.CREATE.key);

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

  async getPlatformRoleById(id: string, userId: string): Promise<PlatformRole> {
    await requireCapability(this.authorizationClient, userId, PLATFORM_ROLE.READ.key);

    const role = await this.platformRoleRepository.findById(id);
    if (!role) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }

    return role;
  }

  async listPlatformRoles(userId: string): Promise<PlatformRole[]> {
    await requireCapability(this.authorizationClient, userId, PLATFORM_ROLE.READ.key);

    return this.platformRoleRepository.findAll();
  }

  async getCapabilitiesForPlatformRole(role: PlatformRole): Promise<Capability[]> {
    const keys = [...capabilityKeysForPlatformRole(role)];
    if (keys.length === 0) {
      return [];
    }

    const capabilities = await this.capabilityRepository.findByKeys(keys);
    const byKey = new Map(capabilities.map((capability) => [capability.key, capability]));

    const ordered: Capability[] = [];
    for (const key of keys) {
      const capability = byKey.get(key);
      if (capability) {
        ordered.push(capability);
      }
    }
    return ordered;
  }

  async updatePlatformRole(
    id: string,
    input: UpdatePlatformRoleInput,
    userId: string,
  ): Promise<PlatformRole> {
    await requireCapability(this.authorizationClient, userId, PLATFORM_ROLE.UPDATE.key);

    const existing = await this.platformRoleRepository.findById(id);
    if (!existing) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }

    if (existing.isSystem) {
      throw new PlatformRoleSystemProtectedError(
        `System platform role cannot be updated: ${id}`,
      );
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

  async deletePlatformRole(id: string, userId: string): Promise<void> {
    await requireCapability(this.authorizationClient, userId, PLATFORM_ROLE.DELETE.key);

    const existing = await this.platformRoleRepository.findById(id);
    if (!existing) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }

    if (existing.isSystem) {
      throw new PlatformRoleSystemProtectedError(
        `System platform role cannot be deleted: ${id}`,
      );
    }

    const deleted = await this.platformRoleRepository.softDelete(id);
    if (!deleted) {
      throw new PlatformRoleNotFoundError(`Platform role not found: ${id}`);
    }
  }
}
