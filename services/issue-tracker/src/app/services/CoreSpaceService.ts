import { Space } from "../../data";
import {
  CreateSpaceOptions,
  CustomFieldService,
  GetSpacesOptions,
  SpaceService,
} from "./interfaces";

export class CoreSpaceService implements SpaceService {
  constructor(private readonly fieldService: CustomFieldService) {}

  async createSpace(options: CreateSpaceOptions) {
    const { manager, name, description, userId, workspaceId } = options;
    const SpaceRepo = manager.getRepository(Space);

    const { id: listId } = await SpaceRepo.save({
      name,
      description,
      createdById: userId,
      workspaceId,
    });

    return listId;
  }

  async findSpaces(options: GetSpacesOptions) {
    const { userId, workspaceId } = options;

    return await Space.find({
      where: { workspaceId, createdById: userId },
      relations: { lists: true },
    });
  }
}
