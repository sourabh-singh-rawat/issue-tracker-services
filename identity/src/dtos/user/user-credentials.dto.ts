interface Inputs {
  email: string;
  password: string;
}

export class UserCredentialsDTO {
  email: string;
  password: string;

  constructor({ email, password }: Inputs) {
    this.email = email;
    this.password = password;
  }
}
