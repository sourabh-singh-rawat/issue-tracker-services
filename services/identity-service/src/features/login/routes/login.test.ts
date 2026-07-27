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

  it("sets the session cookie and returns 204 with no body", async () => {
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
    const status = vi.fn().mockReturnThis();
    const send = vi.fn().mockReturnThis();
    const redirect = vi.fn();
    const req = {
      body: { email: "a@b.com", password: "password" },
      query: {},
    };
    const reply = { setCookie, status, send, redirect };

    await login.handler!(req as never, reply as never);

    expect(get).toHaveBeenCalledWith(TYPES.LoginService);
    expect(loginWithEmailAndPassword).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
      loginChallenge: undefined,
    });
    expect(setCookie).toHaveBeenCalledWith("session", "session-token-1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
      expires: expiresAt,
    });
    expect(status).toHaveBeenCalledWith(204);
    expect(send).toHaveBeenCalledWith();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("passes login_challenge from the query string and redirects when redirectTo is present", async () => {
    const expiresAt = new Date("2030-01-01T00:00:00.000Z");
    const redirectTo = "http://127.0.0.1:4444/oauth2/auth?login_verifier=abc";
    const loginWithEmailAndPassword = vi.fn().mockResolvedValue({
      identity: {
        id: "identity-1",
        email: "a@b.com",
        emailVerified: true,
      },
      sessionToken: "session-token-1",
      expiresAt,
      sessionId: "session-1",
      redirectTo,
    });

    get.mockReturnValue({ loginWithEmailAndPassword });

    const setCookie = vi.fn();
    const status = vi.fn().mockReturnThis();
    const send = vi.fn().mockReturnThis();
    const redirect = vi.fn((url: string) => url);
    const req = {
      body: {
        email: "a@b.com",
        password: "password",
      },
      query: {
        login_challenge: "login-challenge-1",
      },
    };
    const reply = { setCookie, status, send, redirect };

    const response = await login.handler!(req as never, reply as never);

    expect(loginWithEmailAndPassword).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "password",
      loginChallenge: "login-challenge-1",
    });
    expect(setCookie).toHaveBeenCalledWith("session", "session-token-1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
      expires: expiresAt,
    });
    expect(redirect).toHaveBeenCalledWith(redirectTo);
    expect(response).toBe(redirectTo);
    expect(status).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
