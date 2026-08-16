import { InvalidIdentityIdError } from "./InvalidIdentityIdError";
import { isUuidv7 } from "./isUuidv7";
import { MissingIdentityIdError } from "./MissingIdentityIdError";

export type ResolveIdentityIdInput = {
  envVarName?: string;
  env?: Record<string, string | undefined>;
  argv?: readonly string[];
  missingMessage?: string;
};

export const resolveIdentityId = (input: ResolveIdentityIdInput = {}): string => {
  const env = input.env ?? process.env;
  const argv = input.argv ?? process.argv;
  const fromEnv = input.envVarName ? env[input.envVarName]?.trim() : undefined;
  const positional = argv
    .slice(2)
    .map((arg) => arg.trim())
    .filter((arg) => arg.length > 0 && arg !== "--" && !arg.startsWith("-"));

  const identityId = fromEnv || positional[0];
  if (!identityId) {
    throw new MissingIdentityIdError(input.missingMessage);
  }

  if (!isUuidv7(identityId)) {
    throw new InvalidIdentityIdError(identityId);
  }

  return identityId;
};
