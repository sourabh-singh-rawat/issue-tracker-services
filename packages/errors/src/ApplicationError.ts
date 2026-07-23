export abstract class ApplicationError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly expose: boolean,
  ) {
    super(message);
  }
}
