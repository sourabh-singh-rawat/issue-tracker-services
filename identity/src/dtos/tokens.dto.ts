interface TokensInput {
  accessToken: string;
  refreshToken: string;
}

export class Tokens {
  accessToken: string;
  refreshToken: string;

  constructor({ accessToken, refreshToken }: TokensInput) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
