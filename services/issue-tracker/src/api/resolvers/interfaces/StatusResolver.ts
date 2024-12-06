import { FindStatusesOptions, Status } from "../types";

export interface StatusResolver {
  findStatuses(ctx: any, input: FindStatusesOptions): Promise<Status[]>;
}
