import { StatusType } from "@pine/common";
import { ServiceOptions } from "@pine/orm";
import { StatusOption } from "../../entities/Status";

export interface CreateOptionsOptions extends ServiceOptions {
  projectId: string;
  statuses: { name: string; type: StatusType; orderIndex: number }[];
}

export interface FindStatusesOptions {
  projectId: string;
}

export interface StatusService {
  createOptions(options: CreateOptionsOptions): Promise<void>;
  findStatuses(options: FindStatusesOptions): Promise<StatusOption[]>;
}
