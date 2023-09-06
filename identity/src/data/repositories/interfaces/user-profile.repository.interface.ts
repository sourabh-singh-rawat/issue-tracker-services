import { UserProfileEntity } from "../../entities";
import { Repository } from "./repository.interface";

export interface UserProfileRepository extends Repository<UserProfileEntity> {
  findUserProfileByUserId(userId: string): Promise<UserProfileEntity>;
}
