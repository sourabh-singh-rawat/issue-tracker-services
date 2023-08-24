interface UserDetailsInputs {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

export class UserDetailsDto {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;

  constructor({ id, email, isEmailVerified, createdAt }: UserDetailsInputs) {
    this.id = id;
    this.email = email;
    (this.isEmailVerified = isEmailVerified), (this.createdAt = createdAt);
  }
}
