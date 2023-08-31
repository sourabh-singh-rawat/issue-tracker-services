interface UserDetailInputs {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

export class UserDetailDto {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;

  constructor({ id, email, isEmailVerified, createdAt }: UserDetailInputs) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.createdAt = createdAt;
  }
}
