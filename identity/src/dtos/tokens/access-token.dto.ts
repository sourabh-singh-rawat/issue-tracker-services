interface AccessTokenDtoInputs {
  userId: string;
  tokenValue: string;
  expirationAt: Date;
}

export class AccessTokenDTO {
  userId: string;
  tokenValue: string;
  expirationAt: Date;

  constructor({ userId, tokenValue, expirationAt }: AccessTokenDtoInputs) {
    this.userId = userId;
    this.tokenValue = tokenValue;
    this.expirationAt = expirationAt;
  }
}
