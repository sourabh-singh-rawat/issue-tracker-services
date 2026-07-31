import { describe, expect, it, vi } from "vitest";
import {
  IdentityNotFoundError,
  IdentityProviderUnavailableError,
  InvalidCredentialError,
} from "@/integrations/identity";
import { VerificationService } from "./VerificationService";

describe("VerificationService", () => {
  it("delegates email verification to the identity provider", async () => {
    const identityProvider = {
      verifyEmail: vi.fn().mockResolvedValue(undefined),
    };

    const service = new VerificationService(identityProvider as never);

    await expect(
      service.verifyEmail({ flowId: "flow-1", code: "123456" }),
    ).resolves.toBeUndefined();

    expect(identityProvider.verifyEmail).toHaveBeenCalledWith({
      flowId: "flow-1",
      code: "123456",
    });
  });

  it("propagates identity provider errors", async () => {
    const identityProvider = {
      verifyEmail: vi.fn().mockRejectedValue(new InvalidCredentialError()),
    };

    const service = new VerificationService(identityProvider as never);

    await expect(service.verifyEmail({ flowId: "flow-1", code: "bad" })).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );
  });

  it("delegates resend verification email to the identity provider", async () => {
    const identityProvider = {
      resendVerificationEmail: vi.fn().mockResolvedValue(undefined),
    };

    const service = new VerificationService(identityProvider as never);

    await expect(service.resendVerificationEmail({ email: "a@b.com" })).resolves.toBeUndefined();

    expect(identityProvider.resendVerificationEmail).toHaveBeenCalledWith({
      email: "a@b.com",
    });
  });

  it("swallows not-found errors when resending (anti-enumeration)", async () => {
    const identityProvider = {
      resendVerificationEmail: vi.fn().mockRejectedValue(new IdentityNotFoundError()),
    };

    const service = new VerificationService(identityProvider as never);

    await expect(
      service.resendVerificationEmail({ email: "missing@b.com" }),
    ).resolves.toBeUndefined();
  });

  it("propagates provider unavailable errors when resending", async () => {
    const identityProvider = {
      resendVerificationEmail: vi.fn().mockRejectedValue(new IdentityProviderUnavailableError()),
    };

    const service = new VerificationService(identityProvider as never);

    await expect(service.resendVerificationEmail({ email: "a@b.com" })).rejects.toBeInstanceOf(
      IdentityProviderUnavailableError,
    );
  });
});
