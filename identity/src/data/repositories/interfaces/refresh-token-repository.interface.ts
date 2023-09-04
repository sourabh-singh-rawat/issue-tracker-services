import { RefreshTokenEntity } from "../../entities";
import { QueryBuilderOptions } from "./query-builder-options.interface";

export interface RefreshTokenRepository {
  save(token: RefreshTokenEntity, options?: QueryBuilderOptions): Promise<void>;
  softDelete(id: string, options?: QueryBuilderOptions): Promise<void>;
}
