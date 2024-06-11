import { Repository } from "@issue-tracker/orm";
import { AccessTokenEntity } from "../../entities";

export interface AccessTokenRepository extends Repository<AccessTokenEntity> {}
