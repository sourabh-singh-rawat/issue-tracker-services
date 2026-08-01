export interface IRegistrationService {
  register(email: string, username: string, password: string): Promise<void>;
}
