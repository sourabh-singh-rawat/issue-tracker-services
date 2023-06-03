declare namespace Express {
  interface Request extends Express.Request {
    user?: any;
  }
}
