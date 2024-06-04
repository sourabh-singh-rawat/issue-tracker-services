import { Repository } from "@issue-tracker/orm";
import { RefreshTokenEntity } from "../../entities";

export interface RefreshTokenRepository
  extends Repository<RefreshTokenEntity> {}
