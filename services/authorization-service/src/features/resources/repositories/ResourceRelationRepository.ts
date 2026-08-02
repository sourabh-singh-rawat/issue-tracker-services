import { uuidv7 } from "@pine/common";
import { asc, eq } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Database, type ResourceRelation, ResourceRelations } from "@/db";
import type {
  CreateResourceRelationEntity,
  IResourceRelationRepository,
  ResourceRelationRepositoryOptions,
} from "@/features/resources/repositories/IResourceRelationRepository";

@injectable()
export class ResourceRelationRepository implements IResourceRelationRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: ResourceRelationRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(
    entity: CreateResourceRelationEntity,
    options?: ResourceRelationRepositoryOptions,
  ): Promise<ResourceRelation> {
    const client = this.client(options);

    const [created] = await client
      .insert(ResourceRelations)
      .values({
        id: uuidv7(),
        resourceType: entity.resourceType,
        key: entity.key,
      })
      .returning();

    return created;
  }

  async saveMany(
    entities: CreateResourceRelationEntity[],
    options?: ResourceRelationRepositoryOptions,
  ): Promise<ResourceRelation[]> {
    if (entities.length === 0) {
      return [];
    }

    const client = this.client(options);

    return client
      .insert(ResourceRelations)
      .values(
        entities.map((entity) => ({
          id: uuidv7(),
          resourceType: entity.resourceType,
          key: entity.key,
        })),
      )
      .returning();
  }

  async findByResourceType(resourceType: string): Promise<ResourceRelation[]> {
    return this.db
      .select()
      .from(ResourceRelations)
      .where(eq(ResourceRelations.resourceType, resourceType))
      .orderBy(asc(ResourceRelations.key));
  }

  async findAll(): Promise<ResourceRelation[]> {
    return this.db
      .select()
      .from(ResourceRelations)
      .orderBy(asc(ResourceRelations.resourceType), asc(ResourceRelations.key));
  }

  async ensureForResourceType(
    resourceType: string,
    keys: string[],
    options?: ResourceRelationRepositoryOptions,
  ): Promise<void> {
    if (keys.length === 0) {
      return;
    }

    const client = this.client(options);

    for (const key of keys) {
      await client
        .insert(ResourceRelations)
        .values({
          id: uuidv7(),
          resourceType,
          key,
        })
        .onConflictDoNothing({
          target: [ResourceRelations.resourceType, ResourceRelations.key],
        });
    }
  }
}
