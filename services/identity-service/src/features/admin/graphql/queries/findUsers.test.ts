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

vi.mock("@/features/admin/graphql/objects/UserObject", () => ({
  UserObject: "UserObject",
}));

describe("findUsers query", () => {
  beforeEach(() => {
    get.mockReset();
    queryFields.mockReset();
    vi.resetModules();
  });

  it("returns all users from AdminService", async () => {
    const users = [
      { id: "user-1", email: "a@b.com" },
      { id: "user-2", email: "c@d.com" },
    ];
    const findUsersFn = vi.fn().mockResolvedValue(users);
    get.mockReturnValue({ findUsers: findUsersFn });

    let resolve: (() => Promise<typeof users>) | undefined;

    queryFields.mockImplementation((fn: (t: unknown) => unknown) => {
      const t = {
        field: (config: { resolve: () => Promise<typeof users> }) => {
          resolve = config.resolve;
          return config;
        },
      };
      return fn(t);
    });

    await import("@/features/admin/graphql/queries/findUsers");

    const response = await resolve!();

    expect(get).toHaveBeenCalledWith(Symbol.for("IAdminService"));
    expect(findUsersFn).toHaveBeenCalledOnce();
    expect(response).toEqual(users);
  });
});
