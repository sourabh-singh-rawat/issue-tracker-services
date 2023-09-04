interface UserDetailsInput {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

export class UserDetails {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;

  constructor({ id, email, isEmailVerified, createdAt }: UserDetailsInput) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.createdAt = createdAt;
  }
}
