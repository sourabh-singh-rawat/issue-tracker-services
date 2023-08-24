import { UserCredentialsDTO } from "../../../dtos/user";
import { UserEntity } from "../../entities/user.entity";

export interface UserRepository {
  save(entity: UserCredentialsDTO): Promise<UserEntity>;
  existsById(id: string): Promise<boolean>;
  findById(id: string): Promise<UserEntity | null>;
  softDelete(id: string): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  // isOldPasswordMatch(id: string, password: string): Promise<boolean>;
  // update(id: string, user: UserUpdateDto): Promise<UserEntity>;
  updateEmail(id: string, email: string): Promise<boolean>;
  // updateEmailVerificationStatus(id: string, status: string): Promise<void>;
  updatePassword(id: string, password: string): Promise<boolean>;
}
