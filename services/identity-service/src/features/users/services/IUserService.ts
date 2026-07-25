import type { User } from "@/db";

export interface IUserService {
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}
