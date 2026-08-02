import { vi } from "vitest";

export function createKratosMock(overrides?: {
  createNativeLoginFlow?: ReturnType<typeof vi.fn>;
  updateLoginFlow?: ReturnType<typeof vi.fn>;
  createNativeRegistrationFlow?: ReturnType<typeof vi.fn>;
  updateRegistrationFlow?: ReturnType<typeof vi.fn>;
  performNativeLogout?: ReturnType<typeof vi.fn>;
  toSession?: ReturnType<typeof vi.fn>;
  getVerificationFlow?: ReturnType<typeof vi.fn>;
  createNativeVerificationFlow?: ReturnType<typeof vi.fn>;
  updateVerificationFlow?: ReturnType<typeof vi.fn>;
  deleteIdentity?: ReturnType<typeof vi.fn>;
  listIdentities?: ReturnType<typeof vi.fn>;
  createIdentity?: ReturnType<typeof vi.fn>;
}) {
  return {
    frontendApi: {
      createNativeLoginFlow:
        overrides?.createNativeLoginFlow ?? vi.fn().mockResolvedValue({ data: { id: "flow-1" } }),
      updateLoginFlow: overrides?.updateLoginFlow ?? vi.fn(),
      createNativeRegistrationFlow:
        overrides?.createNativeRegistrationFlow ??
        vi.fn().mockResolvedValue({ data: { id: "reg-flow-1" } }),
      updateRegistrationFlow: overrides?.updateRegistrationFlow ?? vi.fn(),
      performNativeLogout: overrides?.performNativeLogout ?? vi.fn().mockResolvedValue(undefined),
      toSession: overrides?.toSession ?? vi.fn(),
      getVerificationFlow: overrides?.getVerificationFlow ?? vi.fn(),
      createNativeVerificationFlow:
        overrides?.createNativeVerificationFlow ??
        vi.fn().mockResolvedValue({ data: { id: "verify-flow-1", ui: { nodes: [] } } }),
      updateVerificationFlow: overrides?.updateVerificationFlow ?? vi.fn(),
    },
    identityApi: {
      deleteIdentity: overrides?.deleteIdentity ?? vi.fn().mockResolvedValue(undefined),
      listIdentities: overrides?.listIdentities ?? vi.fn().mockResolvedValue({ data: [] }),
      createIdentity: overrides?.createIdentity ?? vi.fn(),
    },
  };
}
