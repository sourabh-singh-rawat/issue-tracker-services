import type { Unit, DbClient } from "@/db";

export type UnitRepositoryOptions = { tx: DbClient };

export type CreateUnitEntity = {
  code: string;
  name: string;
  symbol?: string | null;
  isActive?: boolean;
};

export type UpdateUnitEntity = Partial<Pick<Unit, "code" | "name" | "symbol" | "isActive">>;

export interface IUnitRepository {
  save(entity: CreateUnitEntity, options?: UnitRepositoryOptions): Promise<Unit>;
  update(id: string, entity: UpdateUnitEntity, options?: UnitRepositoryOptions): Promise<Unit>;
  delete(id: string, options?: UnitRepositoryOptions): Promise<boolean>;
  existsById(id: string): Promise<boolean>;
  existsByCode(code: string, excludeId?: string): Promise<boolean>;
  findById(id: string): Promise<Unit | null>;
  findByCode(code: string): Promise<Unit | null>;
  findAll(): Promise<Unit[]>;
}
