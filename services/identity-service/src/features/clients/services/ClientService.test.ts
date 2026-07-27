import { describe, expect, it, vi } from "vitest";
import { ClientService } from "./ClientService";

function createService(clientRepository: unknown, oauthProvider: unknown = {}) {
  return new ClientService(
    clientRepository as never,
    {} as never,
    {} as never,
    {} as never,
    {} as never,
    {} as never,
    oauthProvider as never,
    {} as never,
  );
}

describe("ClientService.getClientById", () => {
  it("returns null when the client does not exist", async () => {
    const clientRepository = {
      findDetailsById: vi.fn().mockResolvedValue(null),
    };

    const service = createService(clientRepository);

    await expect(service.getClientById("missing")).resolves.toBeNull();
    expect(clientRepository.findDetailsById).toHaveBeenCalledWith("missing");
  });

  it("returns client details from the repository join query", async () => {
    const details = {
      id: "client-1",
      name: "inventory-web",
      oauthProvider: "hydra",
      providerClientId: "client-1",
      createdAt: new Date("2026-01-01"),
      updatedAt: null,
      deletedAt: null,
      version: 1,
      redirectUris: ["http://localhost/callback", "http://localhost/silent"],
      scopes: ["openid", "profile"],
      grantTypes: ["authorization_code"],
    };

    const clientRepository = {
      findDetailsById: vi.fn().mockResolvedValue(details),
    };

    const service = createService(clientRepository);

    await expect(service.getClientById("client-1")).resolves.toEqual(details);
    expect(clientRepository.findDetailsById).toHaveBeenCalledWith("client-1");
  });
});

describe("ClientService.deleteClientById", () => {
  it("throws when the client does not exist", async () => {
    const clientRepository = {
      findById: vi.fn().mockResolvedValue(null),
      softDeleteWithRelations: vi.fn(),
    };
    const oauthProvider = {
      deleteClient: vi.fn(),
    };

    const service = createService(clientRepository, oauthProvider);

    await expect(service.deleteClientById("missing")).rejects.toThrow("Client not found: missing");
    expect(clientRepository.findById).toHaveBeenCalledWith("missing");
    expect(oauthProvider.deleteClient).not.toHaveBeenCalled();
    expect(clientRepository.softDeleteWithRelations).not.toHaveBeenCalled();
  });

  it("deletes the OAuth client then soft-deletes local rows", async () => {
    const clientRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "client-1",
        name: "inventory-web",
        oauthProvider: "hydra",
        providerClientId: "hydra-client-1",
      }),
      softDeleteWithRelations: vi.fn().mockResolvedValue(true),
    };
    const oauthProvider = {
      deleteClient: vi.fn().mockResolvedValue(undefined),
    };

    const service = createService(clientRepository, oauthProvider);

    await expect(service.deleteClientById("client-1")).resolves.toBeUndefined();
    expect(oauthProvider.deleteClient).toHaveBeenCalledWith("hydra-client-1");
    expect(clientRepository.softDeleteWithRelations).toHaveBeenCalledWith("client-1");
  });

  it("skips the OAuth provider when providerClientId is not set", async () => {
    const clientRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "client-1",
        name: "legacy",
        oauthProvider: null,
        providerClientId: null,
      }),
      softDeleteWithRelations: vi.fn().mockResolvedValue(true),
    };
    const oauthProvider = {
      deleteClient: vi.fn(),
    };

    const service = createService(clientRepository, oauthProvider);

    await expect(service.deleteClientById("client-1")).resolves.toBeUndefined();
    expect(oauthProvider.deleteClient).not.toHaveBeenCalled();
    expect(clientRepository.softDeleteWithRelations).toHaveBeenCalledWith("client-1");
  });
});
