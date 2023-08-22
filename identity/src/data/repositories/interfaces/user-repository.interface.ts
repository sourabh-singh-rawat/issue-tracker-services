import { UserUpdateDto, UserCreateDto } from "../../../dtos/user";
import { UserEntity } from "../../entities/user.entity";

export interface UserRepository {
  save(user: UserCreateDto): Promise<UserEntity>;
  existsById(id: string): Promise<boolean>;
  findById(id: string): Promise<void>;
  update(id: string, user: UserUpdateDto): Promise<UserEntity>;
  delete(): Promise<void>;
  count(): Promise<void>;
}
