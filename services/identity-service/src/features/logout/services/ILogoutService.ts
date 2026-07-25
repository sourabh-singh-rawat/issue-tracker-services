export interface ILogoutService {
  logout(sessionToken: string): Promise<void>;
}
