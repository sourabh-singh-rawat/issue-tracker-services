import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Capability } from "@/db";
import {
  CapabilityKeyConflictError,
  CapabilityNotFoundError,
} from "@/features/capabilities/errors";
import type { ICapabilityRepository } from "@/features/capabilities/repositories";
import type {
  CreateCapabilityInput,
  ICapabilityService,
  UpdateCapabilityInput,
} from "@/features/capabilities/services/ICapabilityService";

const toCapabilityKey = (service: string, resource: string, action: string): string =>
  `${service}:${resource}:${action}`;

@injectable()
export class CapabilityService implements ICapabilityService {
  constructor(
    @inject(TYPES.CapabilityRepository)
    private readonly capabilityRepository: ICapabilityRepository,
  ) {}

  async createCapability(input: CreateCapabilityInput): Promise<Capability> {
    const key = toCapabilityKey(input.service, input.resource, input.action);
    const keyExists = await this.capabilityRepository.existsByKey(key);
    if (keyExists) {
      throw new CapabilityKeyConflictError(`Capability key already exists: ${key}`);
    }

    return this.capabilityRepository.save({
      key,
      service: input.service,
      resource: input.resource,
      action: input.action,
    });
  }

  async getCapabilityByKey(key: string): Promise<Capability> {
    const capability = await this.capabilityRepository.findByKey(key);
    if (!capability) {
      throw new CapabilityNotFoundError(`Capability not found: ${key}`);
    }

    return capability;
  }

  async getCapabilities(): Promise<Capability[]> {
    return this.capabilityRepository.findAll();
  }

  async updateCapability(key: string, input: UpdateCapabilityInput): Promise<Capability> {
    const existing = await this.capabilityRepository.findByKey(key);
    if (!existing) {
      throw new CapabilityNotFoundError(`Capability not found: ${key}`);
    }

    const service = input.service ?? existing.service;
    const resource = input.resource ?? existing.resource;
    const action = input.action ?? existing.action;
    const nextKey = toCapabilityKey(service, resource, action);

    if (nextKey !== key) {
      const keyExists = await this.capabilityRepository.existsByKey(nextKey);
      if (keyExists) {
        throw new CapabilityKeyConflictError(`Capability key already exists: ${nextKey}`);
      }
    }

    return this.capabilityRepository.update(key, {
      key: nextKey,
      service,
      resource,
      action,
    });
  }
}
