import { Repository } from "@issue-tracker/orm";
import { ListItemActivity } from "../../entities";

export interface ProjectActivityRepository
  extends Repository<ListItemActivity> {
  findActivityByProjectId(id: string): Promise<ListItemActivity[]>;
}
