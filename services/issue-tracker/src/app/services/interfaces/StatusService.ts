import { StatusType } from "@issue-tracker/common";
import { ServiceOptions } from "@issue-tracker/orm";
import { Status } from "../../../data";

export interface CreateStatusGroupOptions extends ServiceOptions {
  spaceId: string;
  statuses: { name: string; type: StatusType; orderIndex: number }[];
}

export interface FindStatusesOptions {
  spaceId: string;
}

export interface StatusService {
  createStatusGroup(options: CreateStatusGroupOptions): Promise<void>;
  findStatuses(options: FindStatusesOptions): Promise<Status[]>;
}
