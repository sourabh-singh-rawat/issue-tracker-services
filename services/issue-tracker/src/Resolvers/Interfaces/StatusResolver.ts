import { FindStatusesOptions, Status } from "../Types";

export interface StatusResolver {
  findStatuses(ctx: any, input: FindStatusesOptions): Promise<Status[]>;
}
