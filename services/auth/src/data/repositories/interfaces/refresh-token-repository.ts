import { Repository } from "@issue-tracker/orm";
import { RefreshToken } from "../../entities";

export interface RefreshTokenRepository extends Repository<RefreshToken> {}
