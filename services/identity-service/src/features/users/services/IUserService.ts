import { User } from "@/entities/User";

export interface IUserService {
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
