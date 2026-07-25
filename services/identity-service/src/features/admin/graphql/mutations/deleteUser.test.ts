import { beforeEach, describe, expect, it, vi } from "vitest";

const { get, mutationFields, inputType } = vi.hoisted(() => ({
  get: vi.fn(),
  mutationFields: vi.fn(),
  inputType: vi.fn((_name: string, config: unknown) => config),
}));

vi.mock("@/bootstrap", () => ({
  container: { get },
  TYPES: { AdminService: Symbol.for("IAdminService") },
}));

vi.mock("@pine/graphql-core", () => ({
  builder: {
    mutationFields,
    inputType,
  },
}));

describe("deleteUser mutation", () => {
  beforeEach(() => {
    get.mockReset();
    mutationFields.mockReset();
    inputType.mockClear();
    vi.resetModules();
  });

  it("deletes the user via AdminService and returns a success message", async () => {
    const deleteUserFn = vi.fn().mockResolvedValue(undefined);
    get.mockReturnValue({ deleteUser: deleteUserFn });

    let resolve:
      | ((
          root: unknown,
          args: { input: { userId: string } },
        ) => Promise<string>)
      | undefined;

    mutationFields.mockImplementation((fn: (t: unknown) => unknown) => {
      const t = {
        string: (config: {
          resolve: (
            root: unknown,
            args: { input: { userId: string } },
          ) => Promise<string>;
        }) => {
          resolve = config.resolve;
          return config;
        },
        arg: (opts: unknown) => opts,
      };
      return fn(t);
    });

    await import("@/features/admin/graphql/inputs/DeleteUserInput");
    await import("@/features/admin/graphql/mutations/deleteUser");

    const userId = "01900000-0000-7000-8000-000000000001";
    const response = await resolve!(null, { input: { userId } });

    expect(get).toHaveBeenCalledWith(Symbol.for("IAdminService"));
    expect(deleteUserFn).toHaveBeenCalledWith(userId);
    expect(response).toBe("User deleted successfully.");
  });

  it("keeps userId on DeleteUserInput", async () => {
    await import("@/features/admin/graphql/inputs/DeleteUserInput");

    expect(inputType).toHaveBeenCalledWith(
      "DeleteUserInput",
      expect.objectContaining({
        fields: expect.any(Function),
      }),
    );

    const config = inputType.mock.calls[0][1] as {
      fields: (t: {
        string: (opts: { required: boolean }) => { required: boolean };
      }) => Record<string, unknown>;
    };

    const fields = config.fields({
      string: (opts) => opts,
    });

    expect(fields).toEqual({
      userId: { required: true },
    });
  });
});
