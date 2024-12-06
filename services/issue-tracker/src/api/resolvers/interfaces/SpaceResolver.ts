import { CreateSpaceInput, FindSpacesOptions, Space } from "../types";

export interface SpaceResolver {
  createSpace(ctx: any, input: CreateSpaceInput): Promise<string>;
  findSpaces(ctx: any, input: FindSpacesOptions): Promise<Space[]>;
}
