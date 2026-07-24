export interface IRegistrationService {
  registerWithEmailAndPassword(email: string, password: string): Promise<void>;
}
