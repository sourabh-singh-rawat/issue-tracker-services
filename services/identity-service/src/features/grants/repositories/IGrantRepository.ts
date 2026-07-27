import type { DbClient, Grant } from "@/db";

export type GrantRepositoryOptions = { tx: DbClient };

export interface IGrantRepository {
  save(entity: Partial<Grant> & { name: string }, options?: GrantRepositoryOptions): Promise<Grant>;
  findById(id: string): Promise<Grant | null>;
  findByIds(ids: string[]): Promise<Grant[]>;
  findByName(name: string): Promise<Grant | null>;
  findByNames(names: string[]): Promise<Grant[]>;
  findAll(): Promise<Grant[]>;
  softDelete(id: string, options?: GrantRepositoryOptions): Promise<void>;
}
