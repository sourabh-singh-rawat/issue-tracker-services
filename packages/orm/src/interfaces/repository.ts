import { QueryBuilderOptions } from "./query-builder-options";

export interface Repository<TEntity> {
  save(entity: TEntity, options?: QueryBuilderOptions): Promise<TEntity>;
  existsById(id: string): Promise<boolean>;
  softDelete(id: string, options?: QueryBuilderOptions): Promise<void>;
}
