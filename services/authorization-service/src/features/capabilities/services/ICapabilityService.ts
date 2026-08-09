import type { Capability } from "@/db";

export type CreateCapabilityInput = {
  service: string;
  resource: string;
  action: string;
};

export type UpdateCapabilityInput = {
  service?: string;
  resource?: string;
  action?: string;
};

export interface ICapabilityService {
  createCapability(input: CreateCapabilityInput): Promise<Capability>;
  getCapabilityByKey(key: string): Promise<Capability>;
  getCapabilities(): Promise<Capability[]>;
  updateCapability(key: string, input: UpdateCapabilityInput): Promise<Capability>;
  deleteCapability(key: string): Promise<void>;
}
