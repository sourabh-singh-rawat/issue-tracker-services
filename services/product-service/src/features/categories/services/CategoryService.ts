import { CategoryCreatedEvent, CategoryUpdatedEvent, createCloudEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Category, Database } from "@/db";
import { CategoryCodeConflictError, CategoryNotFoundError } from "@/features/categories/errors";
import type { ICategoryRepository } from "@/features/categories/repositories";
import type {
  CreateCategoryInput,
  ICategoryService,
  UpdateCategoryInput,
} from "@/features/categories/services/ICategoryService";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(TYPES.CategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
    @inject(TYPES.Database)
    private readonly db: Database,
  ) {}

  async createCategory(input: CreateCategoryInput): Promise<Category> {
    await this.ensureCodeAvailable(input.code);
    await this.ensureParentExists(input.parentCategoryId);

    return this.db.transaction(async (tx) => {
      const category = await this.categoryRepository.save(
        {
          code: input.code,
          name: input.name,
          description: input.description,
          parentCategoryId: input.parentCategoryId,
          isActive: input.isActive,
        },
        { tx },
      );

      const event = createCloudEvent({
        type: CategoryCreatedEvent.type,
        version: CategoryCreatedEvent.version,
        schema: CategoryCreatedEvent.schema,
        source: "pine/product-service",
        subject: category.id,
        data: this.toCreatedEventData(category),
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: CategoryCreatedEvent.version,
          aggregateType: "category",
          aggregateId: category.id,
          payload: event,
        },
        { tx },
      );

      return category;
    });
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new CategoryNotFoundError(`Category not found: ${id}`);
    }

    return category;
  }

  async listCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async updateCategory(id: string, input: UpdateCategoryInput): Promise<Category> {
    const existing = await this.categoryRepository.findById(id);
    if (!existing) {
      throw new CategoryNotFoundError(`Category not found: ${id}`);
    }

    if (input.code !== undefined && input.code !== existing.code) {
      await this.ensureCodeAvailable(input.code, id);
    }

    await this.ensureParentValid(input.parentCategoryId, id);

    return this.db.transaction(async (tx) => {
      const category = await this.categoryRepository.update(
        id,
        {
          ...(input.code !== undefined ? { code: input.code } : {}),
          ...(input.name !== undefined ? { name: input.name } : {}),
          ...(input.description !== undefined ? { description: input.description } : {}),
          ...(input.parentCategoryId !== undefined
            ? { parentCategoryId: input.parentCategoryId }
            : {}),
          ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
        },
        { tx },
      );

      const event = createCloudEvent({
        type: CategoryUpdatedEvent.type,
        version: CategoryUpdatedEvent.version,
        schema: CategoryUpdatedEvent.schema,
        source: "pine/product-service",
        subject: category.id,
        data: this.toUpdatedEventData(category),
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: CategoryUpdatedEvent.version,
          aggregateType: "category",
          aggregateId: category.id,
          payload: event,
        },
        { tx },
      );

      return category;
    });
  }

  async deleteCategory(id: string): Promise<void> {
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted) {
      throw new CategoryNotFoundError(`Category not found: ${id}`);
    }
  }

  private async ensureCodeAvailable(code: string, excludeId?: string): Promise<void> {
    const codeExists = await this.categoryRepository.existsByCode(code, excludeId);
    if (!codeExists) {
      return;
    }

    throw new CategoryCodeConflictError(`Category code already exists: ${code}`);
  }

  private async ensureParentExists(parentCategoryId?: string | null): Promise<void> {
    if (parentCategoryId == null) {
      return;
    }

    const parentExists = await this.categoryRepository.existsById(parentCategoryId);
    if (parentExists) {
      return;
    }

    throw new CategoryNotFoundError(`Parent category not found: ${parentCategoryId}`);
  }

  private async ensureParentValid(
    parentCategoryId: string | null | undefined,
    categoryId: string,
  ): Promise<void> {
    if (parentCategoryId == null) {
      return;
    }

    if (parentCategoryId === categoryId) {
      throw new CategoryNotFoundError(`Category cannot be its own parent: ${categoryId}`);
    }

    await this.ensureParentExists(parentCategoryId);
  }

  private toCreatedEventData(category: Category) {
    return {
      id: category.id,
      code: category.code,
      name: category.name,
      isActive: category.isActive,
      createdAt: category.createdAt.toISOString(),
      ...(category.description != null ? { description: category.description } : {}),
      ...(category.parentCategoryId != null ? { parentCategoryId: category.parentCategoryId } : {}),
    };
  }

  private toUpdatedEventData(category: Category) {
    return {
      id: category.id,
      code: category.code,
      name: category.name,
      isActive: category.isActive,
      updatedAt: (category.updatedAt ?? new Date()).toISOString(),
      ...(category.description != null ? { description: category.description } : {}),
      ...(category.parentCategoryId != null ? { parentCategoryId: category.parentCategoryId } : {}),
    };
  }
}
