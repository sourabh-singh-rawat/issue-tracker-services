import type { DbClient, Scope } from "@/db";

export type ScopeRepositoryOptions = { tx: DbClient };

export interface IScopeRepository {
  save(entity: Partial<Scope> & { name: string }, options?: ScopeRepositoryOptions): Promise<Scope>;
  findById(id: string): Promise<Scope | null>;
  findByIds(ids: string[]): Promise<Scope[]>;
  findByName(name: string): Promise<Scope | null>;
  findByNames(names: string[]): Promise<Scope[]>;
  findAll(): Promise<Scope[]>;
  softDelete(id: string, options?: ScopeRepositoryOptions): Promise<void>;
}
