import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { verifyEmail } from "@/features/verification/routes/verifyEmail";

describe("verifyEmail route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("verifies email and returns 200", async () => {
    const verifyEmailFn = vi.fn().mockResolvedValue(undefined);
    get.mockReturnValue({ verifyEmail: verifyEmailFn });

    const send = vi.fn().mockReturnThis();
    const req = {
      query: { flow: "flow-1", code: "123456" },
    };
    const reply = { send };

    await verifyEmail.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.VerificationService);
    expect(verifyEmailFn).toHaveBeenCalledWith({
      flowId: "flow-1",
      code: "123456",
    });
    expect(send).toHaveBeenCalledWith({
      message: "Email verified successfully.",
    });
  });
});
