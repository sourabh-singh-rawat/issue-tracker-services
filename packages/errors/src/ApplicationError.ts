export abstract class ApplicationError extends Error {
  readonly code: string;
  readonly expose: boolean;

  constructor(code: string, message: string, expose: boolean) {
    super(message);
    this.code = code;
    this.expose = expose;
  }
}
