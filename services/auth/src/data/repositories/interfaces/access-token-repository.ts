import { Repository } from "@issue-tracker/orm";
import { AccessToken } from "../../entities";

export interface AccessTokenRepository extends Repository<AccessToken> {}
