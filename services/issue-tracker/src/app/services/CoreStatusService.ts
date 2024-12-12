import { StatusOption, StatusOptionGroup } from "../../data";
import {
  CreateOptionsOptions,
  FindStatusesOptions,
  StatusService,
} from "./interfaces";

export class CoreStatusService implements StatusService {
  async createOptions(options: CreateOptionsOptions) {
    const { manager, statuses, listId } = options;
    const StatusGroupRepo = manager.getRepository(StatusOptionGroup);
    const StatusRepo = manager.getRepository(StatusOption);

    const { id: groupId } = await StatusGroupRepo.save({ listId });
    for await (const status of statuses) {
      const { name, orderIndex, type } = status;

      await StatusRepo.save({ name, type, orderIndex, groupId });
    }
  }

  async findStatuses(options: FindStatusesOptions) {
    const { listId } = options;

    return await StatusOption.find({ where: { group: { listId } } });
  }
}
