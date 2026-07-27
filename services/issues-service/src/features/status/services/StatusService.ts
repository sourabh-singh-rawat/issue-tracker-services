import { injectable } from "inversify";
import { StatusOption } from "@/entities/Status";
import { CreateOptionsOptions, FindStatusesOptions, IStatusService } from "./IStatusService";

@injectable()
export class StatusService implements IStatusService {
  async createOptions(options: CreateOptionsOptions) {
    const { manager, statuses, projectId } = options;
    const StatusRepo = manager.getRepository(StatusOption);

    for await (const status of statuses) {
      const { name, orderIndex, type } = status;

      await StatusRepo.save({ name, type, orderIndex, projectId });
    }
  }

  async findStatuses(options: FindStatusesOptions) {
    const { projectId } = options;

    return await StatusOption.find({ where: { projectId } });
  }
}
