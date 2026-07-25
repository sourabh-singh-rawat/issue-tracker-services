import type { Client } from "@/db";

export type CreateClientInput = {
  name: string;
  redirectUris?: string[];
  scopes?: string[];
  grantTypes: string[];
};

export type ClientDetails = Client & {
  redirectUris: string[];
  scopes: string[];
  grantTypes: string[];
};

export interface IClientService {
  createClient(input: CreateClientInput): Promise<ClientDetails>;
  getClientById(id: string): Promise<ClientDetails | null>;
  deleteClientById(id: string): Promise<void>;
}
