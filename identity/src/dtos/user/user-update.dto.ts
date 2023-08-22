export interface UserUpdateDto {
  email: string;
  password: string;
  isEmailVerified?: boolean;
}
