import { describe, it, expect, vi } from "vitest";
import {
  IdentityAlreadyExistsError,
  IdentityNotFoundError,
  IdentityProviderUnavailableError,
  InvalidCredentialError,
} from "@/integrations/identity/errors";
import { KratosIdentityProvider } from "@/integrations/identity/KratosIdentityProvider";

function createKratosMock(overrides?: {
  createNativeLoginFlow?: ReturnType<typeof vi.fn>;
  updateLoginFlow?: ReturnType<typeof vi.fn>;
  createNativeRegistrationFlow?: ReturnType<typeof vi.fn>;
  updateRegistrationFlow?: ReturnType<typeof vi.fn>;
  performNativeLogout?: ReturnType<typeof vi.fn>;
  toSession?: ReturnType<typeof vi.fn>;
  getVerificationFlow?: ReturnType<typeof vi.fn>;
  createNativeVerificationFlow?: ReturnType<typeof vi.fn>;
  updateVerificationFlow?: ReturnType<typeof vi.fn>;
  deleteIdentity?: ReturnType<typeof vi.fn>;
}) {
  return {
    frontendApi: {
      createNativeLoginFlow:
        overrides?.createNativeLoginFlow ?? vi.fn().mockResolvedValue({ data: { id: "flow-1" } }),
      updateLoginFlow: overrides?.updateLoginFlow ?? vi.fn(),
      createNativeRegistrationFlow:
        overrides?.createNativeRegistrationFlow ??
        vi.fn().mockResolvedValue({ data: { id: "reg-flow-1" } }),
      updateRegistrationFlow: overrides?.updateRegistrationFlow ?? vi.fn(),
      performNativeLogout: overrides?.performNativeLogout ?? vi.fn().mockResolvedValue(undefined),
      toSession: overrides?.toSession ?? vi.fn(),
      getVerificationFlow: overrides?.getVerificationFlow ?? vi.fn(),
      createNativeVerificationFlow:
        overrides?.createNativeVerificationFlow ??
        vi.fn().mockResolvedValue({ data: { id: "verify-flow-1", ui: { nodes: [] } } }),
      updateVerificationFlow: overrides?.updateVerificationFlow ?? vi.fn(),
    },
    identityApi: {
      deleteIdentity: overrides?.deleteIdentity ?? vi.fn().mockResolvedValue(undefined),
    },
  };
}

describe("KratosIdentityProvider.register", () => {
  it("registers with email and password via the native Kratos registration flow", async () => {
    const updateRegistrationFlow = vi.fn().mockResolvedValue({
      data: {
        identity: {
          id: "identity-1",
          traits: { email: "a@b.com" },
          verifiable_addresses: [{ value: "a@b.com", verified: false }],
          created_at: "2024-01-01T00:00:00.000Z",
          updated_at: "2024-01-01T00:00:00.000Z",
        },
      },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ updateRegistrationFlow }) as never,
    );

    await expect(provider.register({ email: "a@b.com", password: "password" })).resolves.toEqual({
      id: "identity-1",
      email: "a@b.com",
      emailVerified: false,
      traits: { email: "a@b.com" },
      createdAt: new Date("2024-01-01T00:00:00.000Z"),
      updatedAt: new Date("2024-01-01T00:00:00.000Z"),
    });

    expect(updateRegistrationFlow).toHaveBeenCalledWith({
      flow: "reg-flow-1",
      updateRegistrationFlowBody: {
        method: "password",
        password: "password",
        traits: { email: "a@b.com" },
      },
    });
  });

  it("passes identitySchema when schemaId is provided", async () => {
    const createNativeRegistrationFlow = vi.fn().mockResolvedValue({ data: { id: "reg-flow-1" } });
    const updateRegistrationFlow = vi.fn().mockResolvedValue({
      data: {
        identity: {
          id: "identity-1",
          traits: { email: "a@b.com" },
        },
      },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ createNativeRegistrationFlow, updateRegistrationFlow }) as never,
    );

    await provider.register({
      email: "a@b.com",
      password: "password",
      schemaId: "user",
      traits: { name: { first: "Ada" } },
    });

    expect(createNativeRegistrationFlow).toHaveBeenCalledWith({
      identitySchema: "user",
    });
    expect(updateRegistrationFlow).toHaveBeenCalledWith({
      flow: "reg-flow-1",
      updateRegistrationFlowBody: {
        method: "password",
        password: "password",
        traits: { name: { first: "Ada" }, email: "a@b.com" },
      },
    });
  });

  it("throws IdentityAlreadyExistsError when Kratos reports a duplicate identifier", async () => {
    const updateRegistrationFlow = vi.fn().mockRejectedValue({
      response: {
        status: 400,
        data: {
          ui: {
            messages: [
              {
                id: 4000007,
                text: "An account with the same identifier already exists.",
                type: "error",
              },
            ],
          },
        },
      },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ updateRegistrationFlow }) as never,
    );

    await expect(
      provider.register({ email: "a@b.com", password: "password" }),
    ).rejects.toBeInstanceOf(IdentityAlreadyExistsError);
  });

  it("throws InvalidCredentialError when Kratos returns a generic 400", async () => {
    const updateRegistrationFlow = vi.fn().mockRejectedValue({
      response: {
        status: 400,
        data: {
          ui: {
            messages: [{ id: 4000005, text: "The password can not be used.", type: "error" }],
          },
        },
      },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ updateRegistrationFlow }) as never,
    );

    await expect(provider.register({ email: "a@b.com", password: "weak" })).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws IdentityProviderUnavailableError when the identity is missing", async () => {
    const updateRegistrationFlow = vi.fn().mockResolvedValue({
      data: {},
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ updateRegistrationFlow }) as never,
    );

    await expect(
      provider.register({ email: "a@b.com", password: "password" }),
    ).rejects.toBeInstanceOf(IdentityProviderUnavailableError);
  });

  it("throws IdentityProviderUnavailableError when Kratos is down", async () => {
    const createNativeRegistrationFlow = vi.fn().mockRejectedValue({
      response: { status: 503 },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ createNativeRegistrationFlow }) as never,
    );

    await expect(
      provider.register({ email: "a@b.com", password: "password" }),
    ).rejects.toBeInstanceOf(IdentityProviderUnavailableError);
  });
});

describe("KratosIdentityProvider.signIn", () => {
  it("signs in with email and password via the native Kratos login flow", async () => {
    const expiresAt = "2030-01-01T00:00:00.000Z";
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
          },
        },
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.signIn({ email: "a@b.com", password: "password" })).resolves.toEqual({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
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

    await expect(provider.signIn({ email: "a@b.com", password: "wrong" })).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws InvalidCredentialError when Kratos returns 401", async () => {
    const updateLoginFlow = vi.fn().mockRejectedValue({
      response: { status: 401 },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.signIn({ email: "a@b.com", password: "wrong" })).rejects.toBeInstanceOf(
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

    await expect(provider.signIn({ email: "a@b.com", password: "password" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });

  it("throws IdentityProviderUnavailableError when the session has no identity", async () => {
    const updateLoginFlow = vi.fn().mockResolvedValue({
      data: {
        session_token: "session-token-1",
        session: {
          id: "session-1",
          expires_at: "2030-01-01T00:00:00.000Z",
        },
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.signIn({ email: "a@b.com", password: "password" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });

  it("throws IdentityProviderUnavailableError when the session token is missing", async () => {
    const updateLoginFlow = vi.fn().mockResolvedValue({
      data: {
        session: {
          id: "session-1",
          expires_at: "2030-01-01T00:00:00.000Z",
          identity: {
            id: "identity-1",
            traits: { email: "a@b.com" },
          },
        },
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.signIn({ email: "a@b.com", password: "password" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });

  it("throws IdentityProviderUnavailableError when the session expiry is missing", async () => {
    const updateLoginFlow = vi.fn().mockResolvedValue({
      data: {
        session_token: "session-token-1",
        session: {
          id: "session-1",
          identity: {
            id: "identity-1",
            traits: { email: "a@b.com" },
          },
        },
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);

    await expect(provider.signIn({ email: "a@b.com", password: "password" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });

  it("always returns a sessionToken and expiresAt on successful sign-in", async () => {
    const expiresAt = "2030-01-01T00:00:00.000Z";
    const updateLoginFlow = vi.fn().mockResolvedValue({
      data: {
        session_token: "session-token-1",
        session: {
          id: "session-1",
          expires_at: expiresAt,
          identity: {
            id: "identity-1",
            traits: { email: "a@b.com" },
          },
        },
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ updateLoginFlow }) as never);
    const result = await provider.signIn({ email: "a@b.com", password: "password" });

    expect(result.sessionToken).toBe("session-token-1");
    expect(result.expiresAt).toEqual(new Date(expiresAt));
    expect(result.expiresAt).toBeInstanceOf(Date);
  });
});

describe("KratosIdentityProvider.logout", () => {
  it("logs out via the native Kratos logout API with the session token", async () => {
    const performNativeLogout = vi.fn().mockResolvedValue(undefined);
    const provider = new KratosIdentityProvider(createKratosMock({ performNativeLogout }) as never);

    await expect(provider.logout("session-token-1")).resolves.toBeUndefined();

    expect(performNativeLogout).toHaveBeenCalledWith({
      performNativeLogoutBody: {
        session_token: "session-token-1",
      },
    });
  });

  it("throws InvalidCredentialError when Kratos returns 401", async () => {
    const performNativeLogout = vi.fn().mockRejectedValue({
      response: { status: 401 },
    });
    const provider = new KratosIdentityProvider(createKratosMock({ performNativeLogout }) as never);

    await expect(provider.logout("session-token-1")).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("throws InvalidCredentialError when Kratos returns 403", async () => {
    const performNativeLogout = vi.fn().mockRejectedValue({
      response: { status: 403 },
    });
    const provider = new KratosIdentityProvider(createKratosMock({ performNativeLogout }) as never);

    await expect(provider.logout("session-token-1")).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("throws IdentityProviderUnavailableError when Kratos is down", async () => {
    const performNativeLogout = vi.fn().mockRejectedValue({
      response: { status: 503 },
    });
    const provider = new KratosIdentityProvider(createKratosMock({ performNativeLogout }) as never);

    await expect(provider.logout("session-token-1")).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });
});

describe("KratosIdentityProvider.getSession", () => {
  it("returns the authenticated identity for a valid session token", async () => {
    const toSession = vi.fn().mockResolvedValue({
      data: {
        id: "session-1",
        identity: {
          id: "identity-1",
          traits: { email: "a@b.com" },
          verifiable_addresses: [{ value: "a@b.com", verified: true }],
          created_at: "2024-01-01T00:00:00.000Z",
          updated_at: "2024-06-01T00:00:00.000Z",
        },
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ toSession }) as never);

    await expect(provider.getSession("session-token-1")).resolves.toEqual({
      id: "identity-1",
      email: "a@b.com",
      emailVerified: true,
      traits: { email: "a@b.com" },
      createdAt: new Date("2024-01-01T00:00:00.000Z"),
      updatedAt: new Date("2024-06-01T00:00:00.000Z"),
    });

    expect(toSession).toHaveBeenCalledWith({
      xSessionToken: "session-token-1",
    });
  });

  it("throws InvalidCredentialError when the session has no identity", async () => {
    const toSession = vi.fn().mockResolvedValue({
      data: {
        id: "session-1",
      },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ toSession }) as never);

    await expect(provider.getSession("session-token-1")).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws InvalidCredentialError when Kratos returns 401", async () => {
    const toSession = vi.fn().mockRejectedValue({
      response: { status: 401 },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ toSession }) as never);

    await expect(provider.getSession("session-token-1")).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws IdentityProviderUnavailableError when Kratos is down", async () => {
    const toSession = vi.fn().mockRejectedValue({
      response: { status: 503 },
    });

    const provider = new KratosIdentityProvider(createKratosMock({ toSession }) as never);

    await expect(provider.getSession("session-token-1")).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });
});

describe("KratosIdentityProvider.deleteIdentity", () => {
  it("deletes the identity via the Kratos admin API", async () => {
    const deleteIdentity = vi.fn().mockResolvedValue(undefined);
    const provider = new KratosIdentityProvider(createKratosMock({ deleteIdentity }) as never);

    await expect(provider.deleteIdentity("identity-1")).resolves.toBeUndefined();

    expect(deleteIdentity).toHaveBeenCalledWith({ id: "identity-1" });
  });

  it("throws IdentityNotFoundError when Kratos returns 404", async () => {
    const deleteIdentity = vi.fn().mockRejectedValue({
      response: { status: 404 },
    });
    const provider = new KratosIdentityProvider(createKratosMock({ deleteIdentity }) as never);

    await expect(provider.deleteIdentity("missing")).rejects.toBeInstanceOf(IdentityNotFoundError);
  });

  it("throws IdentityProviderUnavailableError when Kratos is down", async () => {
    const deleteIdentity = vi.fn().mockRejectedValue({
      response: { status: 503 },
    });
    const provider = new KratosIdentityProvider(createKratosMock({ deleteIdentity }) as never);

    await expect(provider.deleteIdentity("identity-1")).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });
});

describe("KratosIdentityProvider.verifyEmail", () => {
  it("submits the verification code against the Kratos flow", async () => {
    const updateVerificationFlow = vi.fn().mockResolvedValue({
      data: {
        id: "flow-1",
        state: "passed_challenge",
      },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ updateVerificationFlow }) as never,
    );

    await expect(
      provider.verifyEmail({ flowId: "flow-1", code: "123456" }),
    ).resolves.toBeUndefined();

    expect(updateVerificationFlow).toHaveBeenCalledWith({
      flow: "flow-1",
      updateVerificationFlowBody: {
        method: "code",
        code: "123456",
      },
    });
  });

  it("throws InvalidCredentialError when verification did not pass", async () => {
    const updateVerificationFlow = vi.fn().mockResolvedValue({
      data: { id: "flow-1", state: "sent_email" },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ updateVerificationFlow }) as never,
    );

    await expect(provider.verifyEmail({ flowId: "flow-1", code: "bad" })).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws InvalidCredentialError when Kratos returns 400", async () => {
    const updateVerificationFlow = vi.fn().mockRejectedValue({
      response: { status: 400 },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ updateVerificationFlow }) as never,
    );

    await expect(provider.verifyEmail({ flowId: "flow-1", code: "bad" })).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("throws IdentityProviderUnavailableError when Kratos is down", async () => {
    const updateVerificationFlow = vi.fn().mockRejectedValue({
      response: { status: 503 },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ updateVerificationFlow }) as never,
    );

    await expect(provider.verifyEmail({ flowId: "flow-1", code: "123456" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });
});

describe("KratosIdentityProvider.resendVerificationEmail", () => {
  it("creates a verification flow and submits the email to resend the code", async () => {
    const createNativeVerificationFlow = vi.fn().mockResolvedValue({
      data: {
        id: "verify-flow-1",
        state: "choose_method",
      },
    });
    const updateVerificationFlow = vi.fn().mockResolvedValue({
      data: {
        id: "verify-flow-1",
        state: "sent_email",
      },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ createNativeVerificationFlow, updateVerificationFlow }) as never,
    );

    await expect(provider.resendVerificationEmail({ email: "a@b.com" })).resolves.toBeUndefined();

    expect(createNativeVerificationFlow).toHaveBeenCalled();
    expect(updateVerificationFlow).toHaveBeenCalledWith({
      flow: "verify-flow-1",
      updateVerificationFlowBody: {
        method: "code",
        email: "a@b.com",
      },
    });
  });

  it("throws IdentityProviderUnavailableError when Kratos is down", async () => {
    const createNativeVerificationFlow = vi.fn().mockRejectedValue({
      response: { status: 503 },
    });

    const provider = new KratosIdentityProvider(
      createKratosMock({ createNativeVerificationFlow }) as never,
    );

    await expect(provider.resendVerificationEmail({ email: "a@b.com" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });
});
