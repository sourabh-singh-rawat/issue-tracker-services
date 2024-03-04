import { FastifyReply, FastifyRequest } from "fastify";
import { Auth } from "../auth";
import { BadRequestError, UnauthorizedError } from "../../error";

const mockCurrentUser = {
  email: "",
  workspaceId: "",
  createdAt: "2024-10-03T22:39:17.727Z",
  isEmailVerified: false,
  userMetadata: {
    language: "",
  },
  appMetadata: {
    roles: [],
  },
  userId: "fab3cffa-ccb5-43ad-9b00-407e4302df9d",
  iss: "",
  aud: "",
  sub: "",
  exp: 1000000000000,
  jwtid: "",
};
const mockRequest = {
  cookies: {},
} as unknown as FastifyRequest;
const mockReply = {} as FastifyReply;
const mockDone: () => void = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

it("must never throw exception", async () => {
  expect(() =>
    Auth.setCurrentUser(mockRequest, mockReply, mockDone),
  ).not.toThrowError();
});

it("does not set current user if not access token is provided", async () => {
  Auth.setCurrentUser(mockRequest, mockReply, mockDone);
  expect(mockRequest.currentUser).toBeFalsy();
  expect(mockDone).toHaveBeenCalled();
});

it("sets currentUser to accessToken's payload and calls done", async () => {
  mockRequest.currentUser = mockCurrentUser;
  Auth.setCurrentUser(mockRequest, mockReply, mockDone);
  expect(mockRequest.currentUser).toBe(mockCurrentUser);
  expect(mockDone).toHaveBeenCalled();
});

it("throws error if currentUser is not in request", async () => {
  const mockRequest = { cookies: {} } as FastifyRequest;
  expect(() => Auth.requireAuth(mockRequest, mockReply, mockDone)).toThrow(
    UnauthorizedError,
  );
});

it("calls done, if request has currentUser", async () => {
  Auth.requireAuth(mockRequest, mockReply, mockDone);
  expect(mockDone).toHaveBeenCalled();
});

it("throws error for missing access or refresh token", async () => {
  expect(() => Auth.requireTokens(mockRequest, mockReply, mockDone)).toThrow(
    BadRequestError,
  );
  expect(mockDone).not.toBeCalled();
});

it("calls done, if access and refresh token are present", async () => {
  mockRequest.cookies.accessToken = "fake_access_token";
  mockRequest.cookies.refreshToken = "fake_refresh_token";

  Auth.requireTokens(mockRequest, mockReply, mockDone);

  expect(mockDone).toBeCalled();
});
