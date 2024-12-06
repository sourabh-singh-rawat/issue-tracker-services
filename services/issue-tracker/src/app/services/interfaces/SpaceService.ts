import { ServiceOptions } from "@issue-tracker/orm";
import { Space } from "../../../data";

export interface CreateSpaceOptions extends ServiceOptions {
  userId: string;
  workspaceId: string;
  name: string;
  description?: string;
}

export interface GetSpacesOptions {
  userId: string;
  workspaceId: string;
}

export interface SpaceService {
  createSpace(options: CreateSpaceOptions): Promise<string>;
  findSpaces(options: GetSpacesOptions): Promise<Space[]>;
}
