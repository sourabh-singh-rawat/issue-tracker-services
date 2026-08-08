import { describe, it, expect, vi } from "vitest";
import { HydraOAuthClientProvider } from "@/integrations/oauth/HydraOAuthClientProvider";

function createHydraMock(overrides?: {
  getOAuth2Client?: ReturnType<typeof vi.fn>;
  createOAuth2Client?: ReturnType<typeof vi.fn>;
  deleteOAuth2Client?: ReturnType<typeof vi.fn>;
}) {
  return {
    publicUrl: "http://127.0.0.1:4444",
    adminApi: {
      getOAuth2Client: overrides?.getOAuth2Client ?? vi.fn(),
      createOAuth2Client: overrides?.createOAuth2Client ?? vi.fn(),
      deleteOAuth2Client: overrides?.deleteOAuth2Client ?? vi.fn(),
    },
    publicApi: {},
  };
}

describe("HydraOAuthClientProvider.getClient", () => {
  it("returns the mapped OAuth client from the admin API", async () => {
    const getOAuth2Client = vi.fn().mockResolvedValue({
      data: {
        client_id: "client-1",
        client_name: "identity-web",
        redirect_uris: ["http://localhost:3000/callback"],
        grant_types: ["authorization_code"],
        scope: "openid profile",
      },
    });
    const provider = new HydraOAuthClientProvider(createHydraMock({ getOAuth2Client }) as never);

    await expect(provider.getClient("client-1")).resolves.toEqual({
      clientId: "client-1",
      name: "identity-web",
      redirectUris: ["http://localhost:3000/callback"],
      grantTypes: ["authorization_code"],
      scopes: ["openid", "profile"],
      clientSecret: undefined,
    });
    expect(getOAuth2Client).toHaveBeenCalledWith({ id: "client-1" });
  });

  it("returns null when the client does not exist", async () => {
    const getOAuth2Client = vi.fn().mockRejectedValue({ response: { status: 404 } });
    const provider = new HydraOAuthClientProvider(createHydraMock({ getOAuth2Client }) as never);

    await expect(provider.getClient("missing")).resolves.toBeNull();
  });
});

describe("HydraOAuthClientProvider.deleteClient", () => {
  it("deletes the OAuth client via the admin API", async () => {
    const deleteOAuth2Client = vi.fn().mockResolvedValue(undefined);
    const provider = new HydraOAuthClientProvider(createHydraMock({ deleteOAuth2Client }) as never);

    await expect(provider.deleteClient("client-1")).resolves.toBeUndefined();
    expect(deleteOAuth2Client).toHaveBeenCalledWith({ id: "client-1" });
  });

  it("ignores 404 when the client is already gone", async () => {
    const deleteOAuth2Client = vi.fn().mockRejectedValue({ response: { status: 404 } });
    const provider = new HydraOAuthClientProvider(createHydraMock({ deleteOAuth2Client }) as never);

    await expect(provider.deleteClient("missing")).resolves.toBeUndefined();
  });
});
