import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  modulePathIgnorePatterns: ["dist"],
};

export default config;
