import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { resendVerificationEmail } from "@/features/verification/routes/resendVerificationEmail";

describe("resendVerificationEmail route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("requests a resend and returns 200 with a generic message", async () => {
    const resendVerificationEmailFn = vi.fn().mockResolvedValue(undefined);
    get.mockReturnValue({ resendVerificationEmail: resendVerificationEmailFn });

    const send = vi.fn().mockReturnThis();
    const req = {
      body: { email: "a@b.com" },
    };
    const reply = { send };

    await resendVerificationEmail.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.VerificationService);
    expect(resendVerificationEmailFn).toHaveBeenCalledWith({
      email: "a@b.com",
    });
    expect(send).toHaveBeenCalledWith({
      message: "If an account exists for that email, a verification email has been sent.",
    });
  });
});
