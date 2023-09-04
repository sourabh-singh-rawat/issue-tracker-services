import { AccessTokenEntity } from "../../entities";
import { QueryBuilderOptions } from "./query-builder-options.interface";

export interface AccessTokenRepository {
  save(token: AccessTokenEntity, options?: QueryBuilderOptions): Promise<void>;
  softDelete(id: string, options?: QueryBuilderOptions): Promise<void>;
}
