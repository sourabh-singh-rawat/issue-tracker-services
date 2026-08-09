import { BrandCreatedEvent, BrandUpdatedEvent, createCloudEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Brand, Database } from "@/db";
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
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createBrand(input: CreateBrandInput): Promise<Brand> {
    const codeExists = await this.brandRepository.existsByCode(input.code);
    if (codeExists) {
      throw new BrandCodeConflictError(`Brand code already exists: ${input.code}`);
    }

    return this.db.transaction(async (tx) => {
      const brand = await this.brandRepository.save(
        {
          code: input.code,
          name: input.name,
          description: input.description,
          isActive: input.isActive,
        },
        { tx },
      );

      const event = createCloudEvent({
        type: BrandCreatedEvent.type,
        version: BrandCreatedEvent.version,
        schema: BrandCreatedEvent.schema,
        source: "pine/product-service",
        subject: brand.id,
        data: {
          id: brand.id,
          code: brand.code,
          name: brand.name,
          isActive: brand.isActive,
          version: brand.version,
          createdAt: brand.createdAt.toISOString(),
          ...(brand.description != null ? { description: brand.description } : {}),
        },
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: BrandCreatedEvent.version,
          aggregateType: "brand",
          aggregateId: brand.id,
          payload: event,
        },
        { tx },
      );

      return brand;
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

    return this.db.transaction(async (tx) => {
      const brand = await this.brandRepository.update(
        id,
        {
          ...(input.code !== undefined ? { code: input.code } : {}),
          ...(input.name !== undefined ? { name: input.name } : {}),
          ...(input.description !== undefined ? { description: input.description } : {}),
          ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
        },
        { tx },
      );

      const event = createCloudEvent({
        type: BrandUpdatedEvent.type,
        version: BrandUpdatedEvent.version,
        schema: BrandUpdatedEvent.schema,
        source: "pine/product-service",
        subject: brand.id,
        data: {
          id: brand.id,
          code: brand.code,
          name: brand.name,
          isActive: brand.isActive,
          version: brand.version,
          updatedAt: (brand.updatedAt ?? new Date()).toISOString(),
          ...(brand.description != null ? { description: brand.description } : {}),
        },
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: BrandUpdatedEvent.version,
          aggregateType: "brand",
          aggregateId: brand.id,
          payload: event,
        },
        { tx },
      );

      return brand;
    });
  }

  async deleteBrand(id: string): Promise<void> {
    const deleted = await this.brandRepository.delete(id);
    if (!deleted) {
      throw new BrandNotFoundError(`Brand not found: ${id}`);
    }
  }
}
