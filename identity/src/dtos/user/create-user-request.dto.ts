export interface Inputs {
  email: string;
  password: string;
  displayName: string;
}

export class CreateUserRequestDTO {
  email: string;
  password: string;
  displayName: string;

  constructor({ email, password, displayName }: Inputs) {
    this.email = email;
    this.password = password;
    this.displayName = displayName;
  }
}
