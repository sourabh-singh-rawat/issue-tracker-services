import { UserProfileNotFoundError } from "@pine/common";
import { describe, expect, it, vi } from "vitest";
import { ProfileGender } from "@/features/profiles/constants";
import { ProfileService } from "@/features/profiles/services/ProfileService";

const existingProfile = {
  id: "profile-1",
  identityId: "identity-1",
  firstName: "Ada",
  middleName: null,
  lastName: "Lovelace",
  gender: null,
};

describe("ProfileService", () => {
  it("saves a profile", async () => {
    const tx = {};
    const profileRepository = {
      save: vi.fn().mockResolvedValue(existingProfile),
      findByIdentityId: vi.fn(),
      update: vi.fn(),
    };

    const service = new ProfileService(profileRepository);

    await service.create({
      tx,
      identityId: "identity-1",
      firstName: "Ada",
      lastName: "Lovelace",
    });

    expect(profileRepository.save).toHaveBeenCalledWith(
      {
        firstName: "Ada",
        middleName: undefined,
        lastName: "Lovelace",
        identityId: "identity-1",
        description: undefined,
      },
      { tx },
    );
  });

  it("returns the profile by identity id", async () => {
    const profileRepository = {
      save: vi.fn(),
      findByIdentityId: vi.fn().mockResolvedValue(existingProfile),
      update: vi.fn(),
    };

    const service = new ProfileService(profileRepository);

    await expect(service.getByIdentityId("identity-1")).resolves.toEqual(existingProfile);
  });

  it("throws when the profile is missing by identity id", async () => {
    const profileRepository = {
      save: vi.fn(),
      findByIdentityId: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
    };

    const service = new ProfileService(profileRepository);

    await expect(service.getByIdentityId("missing")).rejects.toBeInstanceOf(UserProfileNotFoundError);
  });

  it("updates name fields on the identity profile", async () => {
    const updated = { ...existingProfile, firstName: "Grace", lastName: "Hopper" };
    const profileRepository = {
      save: vi.fn(),
      findByIdentityId: vi.fn().mockResolvedValue(existingProfile),
      update: vi.fn().mockResolvedValue(updated),
    };

    const service = new ProfileService(profileRepository);

    const result = await service.updateName({
      identityId: "identity-1",
      firstName: "Grace",
      lastName: "Hopper",
    });

    expect(profileRepository.findByIdentityId).toHaveBeenCalledWith("identity-1");
    expect(profileRepository.update).toHaveBeenCalledWith("profile-1", {
      firstName: "Grace",
      middleName: null,
      lastName: "Hopper",
    });
    expect(result).toEqual(updated);
  });

  it("throws when updating a name for a missing profile", async () => {
    const profileRepository = {
      save: vi.fn(),
      findByIdentityId: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
    };

    const service = new ProfileService(profileRepository);

    await expect(
      service.updateName({ identityId: "missing", firstName: "Ada" }),
    ).rejects.toBeInstanceOf(UserProfileNotFoundError);
    expect(profileRepository.update).not.toHaveBeenCalled();
  });

  it("updates gender on the identity profile", async () => {
    const updated = { ...existingProfile, gender: ProfileGender.FEMALE };
    const profileRepository = {
      save: vi.fn(),
      findByIdentityId: vi.fn().mockResolvedValue(existingProfile),
      update: vi.fn().mockResolvedValue(updated),
    };

    const service = new ProfileService(profileRepository);

    const result = await service.updateGender({
      identityId: "identity-1",
      gender: ProfileGender.FEMALE,
    });

    expect(profileRepository.update).toHaveBeenCalledWith("profile-1", {
      gender: ProfileGender.FEMALE,
    });
    expect(result).toEqual(updated);
  });

  it("throws when updating gender for a missing profile", async () => {
    const profileRepository = {
      save: vi.fn(),
      findByIdentityId: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
    };

    const service = new ProfileService(profileRepository);

    await expect(
      service.updateGender({ identityId: "missing", gender: ProfileGender.MALE }),
    ).rejects.toBeInstanceOf(UserProfileNotFoundError);
    expect(profileRepository.update).not.toHaveBeenCalled();
  });
});
