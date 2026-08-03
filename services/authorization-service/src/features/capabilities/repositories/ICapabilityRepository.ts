import type { Capability, DbClient } from "@/db";

export type CapabilityRepositoryOptions = { tx: DbClient };

export type CreateCapabilityEntity = {
  key: string;
  service: string;
  resource: string;
  action: string;
};

export type UpdateCapabilityEntity = Partial<
  Pick<Capability, "service" | "resource" | "action" | "key">
>;

export interface ICapabilityRepository {
  save(
    entity: CreateCapabilityEntity,
    options?: CapabilityRepositoryOptions,
  ): Promise<Capability>;
  update(
    key: string,
    entity: UpdateCapabilityEntity,
    options?: CapabilityRepositoryOptions,
  ): Promise<Capability>;
  existsByKey(key: string): Promise<boolean>;
  findByKey(key: string): Promise<Capability | null>;
  findByKeys(keys: string[]): Promise<Capability[]>;
  findAll(): Promise<Capability[]>;
}
