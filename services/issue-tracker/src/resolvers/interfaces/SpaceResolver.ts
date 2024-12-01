import { CreateSpaceInput } from "../types";

export interface SpaceResolver {
  createSpace(ctx: any, input: CreateSpaceInput): Promise<string>;
}
