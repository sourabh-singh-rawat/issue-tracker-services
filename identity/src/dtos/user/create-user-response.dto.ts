interface Inputs {
  accessToken: string;
  refreshToken: string;
}

export class CreateUserResponseDTO {
  accessToken: string;
  refreshToken: string;

  constructor({ accessToken, refreshToken }: Inputs) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
