import type { IdentityProfile } from "@/db";
import type { DbClient } from "@/db";

export type IdentityProfileRepositoryOptions = { tx: DbClient };

export interface IIdentityProfileRepository {
  save(
    entity: Partial<IdentityProfile> & {
      identityId: string;
      firstName: string;
    },
    options?: IdentityProfileRepositoryOptions,
  ): Promise<IdentityProfile>;
  update(
    id: string,
    entity: Partial<
      Pick<
        IdentityProfile,
        "firstName" | "middleName" | "lastName" | "description" | "photoUrl" | "deletedAt"
      >
    >,
    options?: IdentityProfileRepositoryOptions,
  ): Promise<IdentityProfile>;
  existsById(id: string): Promise<boolean>;
  softDelete(id: string, options?: IdentityProfileRepositoryOptions): Promise<void>;
  findById(id: string): Promise<IdentityProfile | null>;
  findByIdentityId(
    identityId: string,
    options?: IdentityProfileRepositoryOptions,
  ): Promise<IdentityProfile | null>;
}
