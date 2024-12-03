import { Status, StatusGroup } from "../data/entities";
import {
  CreateStatusGroupOptions,
  FindStatusesOptions,
  StatusService,
} from "./interfaces";

export class CoreStatusService implements StatusService {
  async createStatusGroup(options: CreateStatusGroupOptions) {
    const { manager, statuses, spaceId } = options;
    const StatusGroupRepo = manager.getRepository(StatusGroup);
    const StatusRepo = manager.getRepository(Status);

    const { id: groupId } = await StatusGroupRepo.save({ spaceId });
    for await (const status of statuses) {
      const { name, orderIndex, type } = status;

      await StatusRepo.save({ name, type, orderIndex, groupId });
    }
  }

  async findStatuses(options: FindStatusesOptions) {
    const { groupId } = options;

    return await Status.find({ where: { groupId } });
  }
}
