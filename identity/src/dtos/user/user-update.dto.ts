interface Inputs {
  email?: string;
  password?: string;
  isEmailVerified?: boolean;
}

export class UserUpdateDto {
  email: string | undefined;
  password: string | undefined;
  isEmailVerified: boolean | undefined;

  constructor({ email, password, isEmailVerified }: Inputs) {
    this.email = email;
    this.password = password;
    this.isEmailVerified = isEmailVerified;
  }
}
