import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { AccessTokenEntity } from "../../entities";

export interface AccessTokenRepository {
  save(token: AccessTokenEntity, options?: QueryBuilderOptions): Promise<void>;
  softDelete(id: string, options?: QueryBuilderOptions): Promise<void>;
}
