import { StatusType } from "@issue-tracker/common";
import { ServiceOptions } from "@issue-tracker/orm";
import { StatusOption } from "../../../data";

export interface CreateOptionsOptions extends ServiceOptions {
  listId: string;
  statuses: { name: string; type: StatusType; orderIndex: number }[];
}

export interface FindStatusesOptions {
  listId: string;
}

export interface StatusService {
  createOptions(options: CreateOptionsOptions): Promise<void>;
  findStatuses(options: FindStatusesOptions): Promise<StatusOption[]>;
}
