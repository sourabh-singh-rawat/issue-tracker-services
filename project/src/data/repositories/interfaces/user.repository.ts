import { Repository } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../../entities/user.entity";

export interface UserRepository extends Repository<UserEntity> {}
