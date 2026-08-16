export class InvalidIdentityIdError extends Error {
  constructor(identityId: string) {
    super(`identityId must be a UUIDv7, got: ${identityId}`);
    this.name = "InvalidIdentityIdError";
  }
}
