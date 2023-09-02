interface Inputs {
  email: string;
  hash?: string;
  salt?: string;
  plain: string;
}

export class UserCredentialsDTO {
  email: string;
  plain: string;
  hash?: string;
  salt?: string;

  constructor({ email, hash, salt, plain }: Inputs) {
    this.email = email;
    this.plain = plain;
    this.hash = hash;
    this.salt = salt;
  }
}
