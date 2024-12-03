import { Space } from "../data/entities";
import {
  CreateSpaceOptions,
  GetSpacesOptions,
  SpaceService,
  StatusService,
} from "./interfaces";

export class CoreSpaceService implements SpaceService {
  constructor(private readonly statusService: StatusService) {}

  async createSpace(options: CreateSpaceOptions) {
    const { manager, name, description, userId, workspaceId } = options;
    const SpaceRepo = manager.getRepository(Space);

    const { id: spaceId } = await SpaceRepo.save({
      name,
      description,
      createdById: userId,
      workspaceId,
    });
    await this.statusService.createStatusGroup({
      manager,
      spaceId,
      statuses: [
        { name: "Backlog", type: "Not Started", orderIndex: 0 },
        { name: "On Hold", type: "Not Started", orderIndex: 1 },
        { name: "Scoping", type: "Active", orderIndex: 2 },
        { name: "Ready for Development", type: "Active", orderIndex: 3 },
        { name: "Development", type: "Active", orderIndex: 4 },
        { name: "Ready for Packaging", type: "Active", orderIndex: 5 },
        { name: "Packaging", type: "Active", orderIndex: 6 },
        { name: "Shipped", type: "Completed", orderIndex: 7 },
        { name: "Completed", type: "Completed", orderIndex: 8 },
        { name: "Closed", type: "Closed", orderIndex: 9 },
      ],
    });

    return spaceId;
  }

  async findSpaces(options: GetSpacesOptions) {
    const { userId, workspaceId } = options;

    return await Space.find({
      where: { workspaceId, createdById: userId },
      relations: { lists: true },
    });
  }
}
