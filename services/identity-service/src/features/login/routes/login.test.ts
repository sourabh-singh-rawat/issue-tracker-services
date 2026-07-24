import { beforeEach, describe, expect, it, vi } from "vitest";

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
}));

import { TYPES } from "@/bootstrap/container-types";
import { login } from "@/features/login/routes/login";

describe("login route", () => {
  beforeEach(() => {
    get.mockReset();
  });

  it("sets the session cookie with the provider session token and expiresAt", async () => {
    const expiresAt = new Date("2030-01-01T00:00:00.000Z");
    const loginWithEmailAndPassword = vi.fn().mockResolvedValue({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
      },
      sessionToken: "session-token-1",
      expiresAt,
      sessionId: "session-1",
    });

    get.mockReturnValue({ loginWithEmailAndPassword });

    const setCookie = vi.fn();
    const send = vi.fn((payload) => payload);
    const req = {
      body: { email: "a@b.com", password: "password" },
    };
    const reply = { setCookie, send };

    const response = await login.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.LoginService);
    expect(loginWithEmailAndPassword).toHaveBeenCalledWith("a@b.com", "password");
    expect(setCookie).toHaveBeenCalledWith("session", "session-token-1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
    });
    expect(response).toEqual({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
      },
    });
    expect(send).toHaveBeenCalledWith({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
      },
    });
  });
});
