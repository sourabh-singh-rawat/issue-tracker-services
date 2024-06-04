interface UserInputs {
  email: string;
  hash: string;
  salt: string;
}

export class User {
  email: string;
  hash: string;
  salt: string;

  constructor({ email, hash, salt }: UserInputs) {
    this.email = email;
    this.hash = hash;
    this.salt = salt;
  }
}
