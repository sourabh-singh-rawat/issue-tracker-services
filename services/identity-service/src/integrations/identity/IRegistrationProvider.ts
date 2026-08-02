import type { Identity, RegisterIdentityInput } from "@/integrations/identity/types";

export interface IRegistrationProvider {
  register(input: RegisterIdentityInput): Promise<Identity>;
}
