import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  PermissionKeyConflictError,
  PermissionNotFoundError,
} from "@/features/permissions/errors";
import type {
  IPermissionRepository,
  Permission,
} from "@/features/permissions/repositories";
import type {
  CreatePermissionInput,
  IPermissionService,
  UpdatePermissionInput,
} from "@/features/permissions/services/IPermissionService";

@injectable()
export class PermissionService implements IPermissionService {
  constructor(
    @inject(TYPES.PermissionRepository)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async createPermission(input: CreatePermissionInput): Promise<Permission> {
    const keyExists = await this.permissionRepository.existsByKey(input.key);
    if (keyExists) {
      throw new PermissionKeyConflictError(`Permission key already exists: ${input.key}`);
    }

    return this.permissionRepository.save({
      key: input.key,
      name: input.name,
      description: input.description,
    });
  }

  async getPermissionByKey(key: string): Promise<Permission> {
    const permission = await this.permissionRepository.findByKey(key);
    if (!permission) {
      throw new PermissionNotFoundError(`Permission not found: ${key}`);
    }

    return permission;
  }

  async getPermissions(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
  }

  async updatePermission(key: string, input: UpdatePermissionInput): Promise<Permission> {
    const existing = await this.permissionRepository.findByKey(key);
    if (!existing) {
      throw new PermissionNotFoundError(`Permission not found: ${key}`);
    }

    return this.permissionRepository.update(key, {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
    });
  }
}
