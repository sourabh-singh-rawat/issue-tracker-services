import { beforeEach, describe, expect, it, vi } from "vitest";

const { get, queryFields } = vi.hoisted(() => ({
  get: vi.fn(),
  queryFields: vi.fn(),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
  TYPES: { AdminService: Symbol.for("IAdminService") },
}));

vi.mock("@pine/graphql-core", () => ({
  builder: {
    queryFields,
  },
}));

vi.mock("@/features/admin/graphql/objects/IdentityObject", () => ({
  IdentityObject: "IdentityObject",
}));

describe("findIdentities query", () => {
  beforeEach(() => {
    get.mockReset();
    queryFields.mockReset();
    vi.resetModules();
  });

  it("returns all identities from AdminService", async () => {
    const identities = [
      { id: "identity-1", idpId: "idp-1", idpProvider: "kratos" },
      { id: "identity-2", idpId: "idp-2", idpProvider: "kratos" },
    ];
    const findIdentitiesFn = vi.fn().mockResolvedValue(identities);
    get.mockReturnValue({ findIdentities: findIdentitiesFn });

    let resolve: (() => Promise<typeof identities>) | undefined;

    queryFields.mockImplementation((fn: (t: unknown) => unknown) => {
      const t = {
        field: (config: { resolve: () => Promise<typeof identities> }) => {
          resolve = config.resolve;
          return config;
        },
      };
      return fn(t);
    });

    await import("@/features/admin/graphql/queries/findIdentities");

    const response = await resolve!();

    expect(get).toHaveBeenCalledWith(Symbol.for("IAdminService"));
    expect(findIdentitiesFn).toHaveBeenCalledOnce();
    expect(response).toEqual(identities);
  });
});
