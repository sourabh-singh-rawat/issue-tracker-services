import { AccessToken } from "../interfaces";
import { JwtToken } from "../jwt-token";

const accessTokenPayload: AccessToken = {
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
  exp: 1000000000000000,
  jwtid: "",
};

const accessToken = JwtToken.create(accessTokenPayload, "secret");
it("should generate token", async () => {
  expect(accessToken).toBeTruthy();
});

const [header, payload, signature] = accessToken.split(".");
it("should have a header, payload and signature", async () => {
  expect(header).toBeTruthy();
  expect(payload).toBeTruthy();
  expect(signature).toBeTruthy();
});

it("should have payload which matches with verified token's payload", async () => {
  const decodedPayload = JwtToken.verify(accessToken, "secret");
  expect(decodedPayload).toEqual(accessTokenPayload);
});

it("should not throw error if token is valid", async () => {
  JwtToken.verify(accessToken, "secret");
});

it("should throw error if token is invalid", async () => {
  expect(() => JwtToken.verify(accessToken + "1", "secret")).toThrowError();
});
