import { RefreshTokenDTO } from "../../../dtos/tokens/refresh-token.dto";
import { RepositoryOptions } from "./user-repository.interface";

export interface RefreshTokenRepository {
  save(entity: RefreshTokenDTO, opts?: RepositoryOptions): Promise<void>;
}
