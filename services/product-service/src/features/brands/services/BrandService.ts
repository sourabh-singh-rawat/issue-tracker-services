import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Brand } from "@/db";
import { BrandCodeConflictError, BrandNotFoundError } from "@/features/brands/errors";
import type { IBrandRepository } from "@/features/brands/repositories";
import type {
  CreateBrandInput,
  IBrandService,
  UpdateBrandInput,
} from "@/features/brands/services/IBrandService";

@injectable()
export class BrandService implements IBrandService {
  constructor(
    @inject(TYPES.BrandRepository)
    private readonly brandRepository: IBrandRepository,
  ) {}

  async createBrand(input: CreateBrandInput): Promise<Brand> {
    const codeExists = await this.brandRepository.existsByCode(input.code);
    if (codeExists) {
      throw new BrandCodeConflictError(`Brand code already exists: ${input.code}`);
    }

    return this.brandRepository.save({
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    });
  }

  async getBrandById(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findById(id);
    if (!brand) {
      throw new BrandNotFoundError(`Brand not found: ${id}`);
    }

    return brand;
  }

  async listBrands(): Promise<Brand[]> {
    return this.brandRepository.findAll();
  }

  async updateBrand(id: string, input: UpdateBrandInput): Promise<Brand> {
    const existing = await this.brandRepository.findById(id);
    if (!existing) {
      throw new BrandNotFoundError(`Brand not found: ${id}`);
    }

    if (input.code !== undefined && input.code !== existing.code) {
      const codeExists = await this.brandRepository.existsByCode(input.code, id);
      if (codeExists) {
        throw new BrandCodeConflictError(`Brand code already exists: ${input.code}`);
      }
    }

    return this.brandRepository.update(id, {
      ...(input.code !== undefined ? { code: input.code } : {}),
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
    });
  }

  async deleteBrand(id: string): Promise<void> {
    const deleted = await this.brandRepository.delete(id);
    if (!deleted) {
      throw new BrandNotFoundError(`Brand not found: ${id}`);
    }
  }
}
