import {
  mockManager,
  UserProfileMock,
} from "../../../data/__mocks__/Repository";
import { CoreUserProfileService } from "../CoreUserProfileService";

describe("CoreUserProfileService", () => {
  const service = new CoreUserProfileService();
  const displayName = "Maxwell";
  const userId = "uuid-v4";

  it("Creates user's profile with displayName and userId", async () => {
    await service.createUserProfile({
      manager: mockManager,
      displayName,
      userId,
    });

    expect(UserProfileMock.save).toHaveBeenCalledTimes(1);
    expect(UserProfileMock.save).toHaveBeenCalledWith({ displayName, userId });
  });
});
