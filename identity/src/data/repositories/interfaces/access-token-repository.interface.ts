import { AccessTokenDTO } from "../../../dtos/tokens/access-token.dto";
import { RepositoryOptions } from "./user-repository.interface";

export interface AccessTokenRepository {
  save(entity: AccessTokenDTO, opts?: RepositoryOptions): Promise<void>;
}
