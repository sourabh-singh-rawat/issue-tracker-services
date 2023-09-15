import { RefreshTokenEntity } from "../../entities";
import { Repository } from "./repository";

export interface RefreshTokenRepository
  extends Repository<RefreshTokenEntity> {}
