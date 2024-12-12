import { View } from "../../data";
import {
  CreateInitialViews,
  CreateViewOptions,
  ViewService,
} from "./interfaces";

export class CoreViewService implements ViewService {
  async createIntialViews(options: CreateInitialViews) {
    const { manager, listId } = options;
    const ViewRepo = manager.getRepository(View);

    await this.createView({ manager, name: "List", listId });
    // add fields to view
  }

  async createView(options: CreateViewOptions) {
    const { manager, name, listId } = options;
    const ViewRepo = manager.getRepository(View);

    await ViewRepo.save({ name, listId });
  }
}
