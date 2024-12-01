import { ServiceOptions } from "@issue-tracker/orm";

export interface CreateSpaceOptions extends ServiceOptions {
  userId: string;
  workspaceId: string;
  name: string;
  description?: string;
}

export interface SpaceService {
  createSpace(options: CreateSpaceOptions): Promise<string>;
}
