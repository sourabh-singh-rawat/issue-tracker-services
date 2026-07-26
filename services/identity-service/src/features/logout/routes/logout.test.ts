import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { logout } from "@/features/logout/routes/logout";
import { InvalidCredentialError } from "@/integrations/identity";

describe("logout route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("logs out with the session cookie and clears it", async () => {
    const logoutFn = vi.fn().mockResolvedValue(undefined);
    get.mockReturnValue({ logout: logoutFn });

    const clearCookie = vi.fn();
    const send = vi.fn((payload) => payload);
    const req = {
      cookies: { session: "session-token-1" },
    };
    const reply = { clearCookie, send };

    const response = await logout.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.LogoutService);
    expect(logoutFn).toHaveBeenCalledWith("session-token-1");
    expect(clearCookie).toHaveBeenCalledWith("session", {
      path: "/",
      sameSite: "lax",
      secure: false,
    });
    expect(response).toEqual({
      message: "Logged out successfully.",
    });
    expect(send).toHaveBeenCalledWith({
      message: "Logged out successfully.",
    });
  });

  it("throws InvalidCredentialError when the session cookie is missing", async () => {
    const logoutFn = vi.fn();
    get.mockReturnValue({ logout: logoutFn });

    const clearCookie = vi.fn();
    const send = vi.fn();
    const req = {
      cookies: {},
    };
    const reply = { clearCookie, send };

    await expect(logout.handler!(req as never, reply as never)).rejects.toBeInstanceOf(
      InvalidCredentialError,
    );

    expect(logoutFn).not.toHaveBeenCalled();
    expect(clearCookie).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
