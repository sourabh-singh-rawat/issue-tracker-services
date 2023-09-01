interface RefreshTokenDtoInputs {
  userId: string;
  tokenValue: string;
  expirationAt: Date;
}

export class RefreshTokenDTO {
  userId: string;
  tokenValue: string;
  expirationAt: Date;

  constructor({ userId, tokenValue, expirationAt }: RefreshTokenDtoInputs) {
    this.userId = userId;
    this.tokenValue = tokenValue;
    this.expirationAt = expirationAt;
  }
}
