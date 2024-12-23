import { FIELD_TYPE } from "@issue-tracker/common";
import { View, ViewSystemField } from "../../data";
import {
  CreateDefaultViewOptions,
  CreateViewOptions,
  ViewService,
} from "./interfaces";

export class CoreViewService implements ViewService {
  async createDefaultView(options: CreateDefaultViewOptions) {
    const { manager, listId } = options;

    await this.createView({
      manager,
      name: "List",
      listId,
      isDefaultView: true,
      systemFields: [FIELD_TYPE._STATUS, FIELD_TYPE._PRIORITY],
    });
  }

  async createView(options: CreateViewOptions) {
    const { manager, name, listId, isDefaultView, systemFields } = options;
    const ViewRepo = manager.getRepository(View);
    const ViewSystemFieldRepo = manager.getRepository(ViewSystemField);

    const { id } = await ViewRepo.save({ name, listId, isDefaultView });

    if (systemFields) {
      for await (const field of systemFields) {
        await ViewSystemFieldRepo.save({ viewId: id, name: field });
      }
    }
  }
}
