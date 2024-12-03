import { CreateSpaceInput, FindSpacesOptions, Space } from "../Types";

export interface SpaceResolver {
  createSpace(ctx: any, input: CreateSpaceInput): Promise<string>;
  findSpaces(ctx: any, input: FindSpacesOptions): Promise<Space[]>;
}
