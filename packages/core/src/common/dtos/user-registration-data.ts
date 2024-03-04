import { AuthCredentialsInputs } from "./auth-credentials";

export interface UserRegistrationDataInputs extends AuthCredentialsInputs {
  displayName: string;
}

export class UserRegistrationData {
  email: string;
  password: string;
  displayName: string;

  constructor({ email, password, displayName }: UserRegistrationDataInputs) {
    this.email = email;
    this.password = password;
    this.displayName = displayName;
  }
}
