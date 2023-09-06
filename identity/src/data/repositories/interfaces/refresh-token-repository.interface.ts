import { RefreshTokenEntity } from "../../entities";
import { Repository } from "./repository.interface";

export interface RefreshTokenRepository
  extends Repository<RefreshTokenEntity> {}
