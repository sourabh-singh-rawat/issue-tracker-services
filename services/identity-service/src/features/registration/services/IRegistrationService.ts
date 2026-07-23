export interface IRegistrationService {
  registerUserWithEmailAndPassword(email: string, password: string): Promise<void>;
}
