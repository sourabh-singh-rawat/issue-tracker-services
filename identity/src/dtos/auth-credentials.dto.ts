interface AuthCredentialInputs {
  email: string;
  password: string;
  displayName?: string;
}

export class AuthCredentials {
  email: string;
  password: string;
  displayName?: string;

  constructor({ email, password, displayName }: AuthCredentialInputs) {
    this.email = email;
    this.password = password;
    this.displayName = displayName;
  }
}
