import { Space } from "../data/entities";
import { CreateSpaceOptions, SpaceService } from "./interfaces";

export class CoreSpaceService implements SpaceService {
  async createSpace(options: CreateSpaceOptions) {
    const { manager, name, description, userId, workspaceId } = options;
    const SpaceRepo = manager.getRepository(Space);

    const savedSpace = await SpaceRepo.save({
      name,
      description,
      createdById: userId,
      workspaceId,
    });

    return savedSpace.id;
  }
}
