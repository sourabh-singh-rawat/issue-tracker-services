import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Unit } from "@/db";
import { UnitCodeConflictError, UnitNotFoundError } from "@/features/units/errors";
import type { IUnitRepository } from "@/features/units/repositories";
import type {
  CreateUnitInput,
  IUnitService,
  UpdateUnitInput,
} from "@/features/units/services/IUnitService";

@injectable()
export class UnitService implements IUnitService {
  constructor(
    @inject(TYPES.UnitRepository)
    private readonly unitRepository: IUnitRepository,
  ) {}

  async createUnit(input: CreateUnitInput): Promise<Unit> {
    const codeExists = await this.unitRepository.existsByCode(input.code);
    if (codeExists) {
      throw new UnitCodeConflictError(`Unit code already exists: ${input.code}`);
    }

    return this.unitRepository.save({
      code: input.code,
      name: input.name,
      symbol: input.symbol,
      isActive: input.isActive,
    });
  }

  async getUnitById(id: string): Promise<Unit> {
    const unit = await this.unitRepository.findById(id);
    if (!unit) {
      throw new UnitNotFoundError(`Unit not found: ${id}`);
    }

    return unit;
  }

  async listUnits(): Promise<Unit[]> {
    return this.unitRepository.findAll();
  }

  async updateUnit(id: string, input: UpdateUnitInput): Promise<Unit> {
    const existing = await this.unitRepository.findById(id);
    if (!existing) {
      throw new UnitNotFoundError(`Unit not found: ${id}`);
    }

    if (input.code !== undefined && input.code !== existing.code) {
      const codeExists = await this.unitRepository.existsByCode(input.code, id);
      if (codeExists) {
        throw new UnitCodeConflictError(`Unit code already exists: ${input.code}`);
      }
    }

    return this.unitRepository.update(id, {
      ...(input.code !== undefined ? { code: input.code } : {}),
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.symbol !== undefined ? { symbol: input.symbol } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
    });
  }

  async deleteUnit(id: string): Promise<void> {
    const deleted = await this.unitRepository.delete(id);
    if (!deleted) {
      throw new UnitNotFoundError(`Unit not found: ${id}`);
    }
  }
}
