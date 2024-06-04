export interface AuthCredentialsInputs {
  email: string;
  password: string;
}

export class AuthCredentials {
  email: string;
  password: string;

  constructor({ email, password }: AuthCredentialsInputs) {
    this.email = email;
    this.password = password;
  }
}
