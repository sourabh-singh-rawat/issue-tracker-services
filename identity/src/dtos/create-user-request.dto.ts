interface CreateUserInputs {
  email: string;
  password: string;
  displayName: string;
}

export class CreateUserDTO {
  email: string;
  password: string;
  displayName: string;

  constructor({ email, password, displayName }: CreateUserInputs) {
    this.email = email;
    this.password = password;
    this.displayName = displayName;
  }
}
