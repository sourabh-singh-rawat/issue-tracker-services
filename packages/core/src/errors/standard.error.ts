export abstract class StandardError extends Error {
  /**
   * Error code as described in the common enums
   */
  abstract errorCode: string;
  /**
   * Error message explaining the error
   */
  abstract readonly errorMessage: string;
  /**
   * Timestamp at which the error occured
   * */
  readonly timestamp: string;
  /**
   * Optional statusCode which represents the HTTP status code
   */
  readonly statusCode?: number;

  constructor(message?: string) {
    super(message);

    this.timestamp = new Date().toISOString();
  }

  abstract serializeError(): { errors: [{ message: string; field?: string }] };
}
