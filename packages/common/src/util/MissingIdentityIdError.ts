export class MissingIdentityIdError extends Error {
  constructor(message = "identityId is required") {
    super(message);
    this.name = "MissingIdentityIdError";
  }
}
