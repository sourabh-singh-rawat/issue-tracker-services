import { Hash } from "../hash";

const password = "password";
it("should create hashed password and random salt", async () => {
  const { hash, salt } = await Hash.create(password);
  expect(hash).toBeTruthy();
  expect(salt).toBeTruthy();
});

it("should return true if password is correct", async () => {
  const { hash, salt } = await Hash.create(password);

  expect(await Hash.verify(hash, salt, password)).toBe(true);
});

it("should return false if password is incorrect", async () => {
  const { hash, salt } = await Hash.create(password);

  expect(await Hash.verify(hash, salt, "password2")).toBe(false);
});
