import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

vi.mock("@pine/security", () => ({
  JwtToken: {
    verify: vi.fn(),
  },
  hasUserIdentity: vi.fn(),
}));

import { JwtToken, hasUserIdentity } from "@pine/security";
import { TYPES } from "@/bootstrap/container-types";
import { InvalidCredentialError } from "@/features/me/errors";
import { me } from "@/features/me/routes/me";

describe("me route", () => {
  beforeEach(() => {
    get.mockReset();
    vi.mocked(JwtToken.verify).mockReset();
    vi.mocked(hasUserIdentity).mockReset();
  });

  it("returns the current identity for a valid access token cookie", async () => {
    vi.mocked(JwtToken.verify).mockResolvedValue({
      userId: "identity-1",
      email: "a@b.com",
    } as never);
    vi.mocked(hasUserIdentity).mockReturnValue(true);

    const getCurrentUser = vi.fn().mockResolvedValue({
      id: "identity-1",
    });
    get.mockReturnValue({ getCurrentUser });

    const send = vi.fn((payload) => payload);
    const req = {
      cookies: { accessToken: "token-1" },
    };
    const reply = { send };

    const response = await me.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.MeService);
    expect(getCurrentUser).toHaveBeenCalledWith("identity-1");
    expect(response).toEqual({
      identity: {
        id: "identity-1",
      },
    });
    expect(send).toHaveBeenCalledWith({
      identity: {
        id: "identity-1",
      },
    });
  });

  it("throws InvalidCredentialError when the access token cookie is missing", async () => {
    const getCurrentUser = vi.fn();
    get.mockReturnValue({ getCurrentUser });

    const send = vi.fn();
    const req = {
      cookies: {},
    };
    const reply = { send };

    await expect(me.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(getCurrentUser).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
