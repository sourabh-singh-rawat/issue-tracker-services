import { UserNotFoundError } from "@issue-tracker/common";
import { NatsPublisher } from "@issue-tracker/event-bus";
import { List, User } from "../../data";
import { StatusService } from "./interfaces";
import {
  CreateListOptions,
  FindListOptions,
  FindListsOptions,
  ListService,
  UpdateListOptions,
} from "./interfaces/ListService";
import { UserService } from "./interfaces/UserService";

export class CoreListService implements ListService {
  constructor(
    private readonly publisher: NatsPublisher,
    private readonly userService: UserService,
    private readonly statusService: StatusService,
  ) {}

  private async getUserById(userId: string) {
    return await User.findOne({ where: { id: userId } });
  }

  async createList(options: CreateListOptions) {
    const { manager, name, userId, spaceId } = options;
    const user = await this.getUserById(userId);
    const ListRepo = manager.getRepository(List);
    if (!user) throw new UserNotFoundError();

    const savedList = await ListRepo.save({
      name,
      createdById: userId,
      workspaceId: user.defaultWorkspaceId,
      spaceId,
    });
    const { id: listId } = savedList;

    await this.statusService.createOptions({
      manager,
      listId,
      statuses: [
        { name: "Lead", type: "Active", orderIndex: 0 },
        { name: "Qualified Lead", type: "Active", orderIndex: 1 },
        { name: "Opportunity", type: "Active", orderIndex: 2 },
        { name: "Customer", type: "Active", orderIndex: 3 },
        { name: "Returning Customer", type: "Active", orderIndex: 4 },
        { name: "Inactive", type: "Active", orderIndex: 5 },
        { name: "Hot Lead", type: "Active", orderIndex: 6 },
        { name: "Cold Lead", type: "Active", orderIndex: 7 },
        { name: "Prospect", type: "Active", orderIndex: 8 },
      ],
    });
    await this.publisher.send("project.created", savedList);

    return listId;
  }

  async findLists(options: FindListsOptions) {
    const { page, pageSize, sortBy, sortOrder, userId } = options;
    const workspaceId = await this.userService.getDefaultWorkspaceId(userId);

    const [rows, rowCount] = await List.findAndCount({
      where: { workspaceId },
      skip: page,
      take: pageSize,
    });

    return { rows, rowCount };
  }

  async findList(options: FindListOptions) {
    const { id, userId } = options;
    return await List.findOneOrFail({ where: { id, createdById: userId } });
  }

  async updateList(options: UpdateListOptions) {
    const { manager, id, name } = options;
    const ListRepo = manager.getRepository(List);

    const updatedList = await ListRepo.update({ id }, { name });

    await this.publisher.send("project.updated", updatedList);
  }
}
