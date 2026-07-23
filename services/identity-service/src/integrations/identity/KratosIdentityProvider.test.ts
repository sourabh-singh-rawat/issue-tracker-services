import { describe, it, expect, vi } from "vitest";
import {
  IdentityProviderUnavailableError,
  InvalidCredentialError,
} from "@/integrations/identity/errors";
import { KratosIdentityProvider } from "@/integrations/identity/KratosIdentityProvider";

function createKratosMock(overrides?: {
  createNativeLoginFlow?: ReturnType<typeof vi.fn>;
  updateLoginFlow?: ReturnType<typeof vi.fn>;
}) {
  return {
    frontendApi: {
      createNativeLoginFlow:
        overrides?.createNativeLoginFlow ?? vi.fn().mockResolvedValue({ data: { id: "flow-1" } }),
      updateLoginFlow: overrides?.updateLoginFlow ?? vi.fn(),
    },
    identityApi: {},
  };
}

describe("KratosIdentityProvider.login", () => {
  it("logs in with email and password via the native Kratos login flow", async () => {
    const expiresAt = "2030-01-01T00:00:00.000Z";
    const createdAt = "2024-01-01T00:00:00.000Z";
    const updateLoginFlow = vi.fn().mockResolvedValue({
      data: {
        session_token: "session-token-1",
        session: {
          id: "session-1",
          expires_at: expiresAt,
          identity: {
            id: "identity-1",
            traits: { email: "a@b.com" },
            verifiable_addresses: [{ value: "a@b.com", verified: true }],
            created_at: createdAt,
            updated_at: createdAt,
          },
        },
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.login({ email: "a@b.com", password: "password" })).resolves.toEqual({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
        traits: { email: "a@b.com" },
        createdAt: new Date(createdAt),
        updatedAt: new Date(createdAt),
      },
      sessionToken: "session-token-1",
      sessionId: "session-1",
      expiresAt: new Date(expiresAt),
    });

    expect(updateLoginFlow).toHaveBeenCalledWith({
      flow: "flow-1",
      updateLoginFlowBody: {
        method: "password",
        identifier: "a@b.com",
        password: "password",
      },
    });
  });

  it("throws InvalidCredentialError when Kratos returns 400", async () => {
    const updateLoginFlow = vi.fn().mockRejectedValue({
      response: { status: 400 },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.login({ email: "a@b.com", password: "wrong" })).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws InvalidCredentialError when Kratos returns 401", async () => {
    const updateLoginFlow = vi.fn().mockRejectedValue({
      response: { status: 401 },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.login({ email: "a@b.com", password: "wrong" })).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws IdentityProviderUnavailableError when Kratos is down", async () => {
    const createNativeLoginFlow = vi.fn().mockRejectedValue({
      response: { status: 503 },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ createNativeLoginFlow }) as never,
    );

    await expect(provider.login({ email: "a@b.com", password: "password" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });

  it("throws IdentityProviderUnavailableError when the session has no identity", async () => {
    const updateLoginFlow = vi.fn().mockResolvedValue({
      data: {
        session_token: "session-token-1",
        session: {
          id: "session-1",
        },
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.login({ email: "a@b.com", password: "password" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });
});
