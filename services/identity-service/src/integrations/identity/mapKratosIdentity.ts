import type { Identity } from "@/integrations/identity/types";

type KratosIdentityLike = {
  id: string;
  traits?: unknown;
  verifiable_addresses?: Array<{ value?: string; verified?: boolean }>;
  created_at?: string;
  updated_at?: string;
};

export function mapKratosIdentity(identity: KratosIdentityLike, fallbackEmail = ""): Identity {
  const traits = (identity.traits ?? {}) as Record<string, unknown>;
  const email = typeof traits.email === "string" ? traits.email : fallbackEmail;
  const emailVerified = identity.verifiable_addresses?.some(
    (address) => address.value === email && address.verified,
  );

  return {
    id: identity.id,
    email,
    emailVerified,
    traits,
    createdAt: identity.created_at ? new Date(identity.created_at) : undefined,
    updatedAt: identity.updated_at ? new Date(identity.updated_at) : undefined,
  };
}
