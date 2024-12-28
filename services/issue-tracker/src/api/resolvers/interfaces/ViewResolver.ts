import { AppContext } from "@issue-tracker/server-core";
import { View } from "../types";

export interface ViewResolver {
  findViews(ctx: AppContext, listId: string): Promise<View[]>;
  findView(ctx: AppContext, viewId: string): Promise<View>;
}
