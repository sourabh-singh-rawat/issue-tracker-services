interface Inputs {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

export class UserDTO {
  id: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;

  constructor({ id, email, isEmailVerified, createdAt }: Inputs) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.createdAt = createdAt;
  }
}
