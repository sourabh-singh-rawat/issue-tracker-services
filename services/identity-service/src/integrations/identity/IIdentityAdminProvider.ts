import type {
  CreateIdentityInput,
  Identity,
  UpdateIdentityInput,
} from "@/integrations/identity/types";

export interface IIdentityAdminProvider {
  getIdentity(id: string): Promise<Identity>;
  existsByEmail(email: string): Promise<boolean>;
  createIdentity(input: CreateIdentityInput): Promise<Identity>;
  updateIdentity(id: string, input: UpdateIdentityInput): Promise<Identity>;
  deleteIdentity(id: string): Promise<void>;
}
