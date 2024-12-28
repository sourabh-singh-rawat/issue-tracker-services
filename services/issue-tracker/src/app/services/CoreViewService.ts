import { FIELD_TYPE, VIEW_TYPE } from "@issue-tracker/common";
import { View, ViewSystemField } from "../../data";
import {
  CreateDefaultViewOptions,
  CreateViewOptions,
  GetViewsOptions,
  ViewService,
} from "./interfaces";

export class CoreViewService implements ViewService {
  async createDefaultViews(options: CreateDefaultViewOptions) {
    const { manager, listId, userId } = options;

    const listViewId = await this.createView({
      manager,
      name: VIEW_TYPE.LIST,
      listId,
      userId,
      type: VIEW_TYPE.LIST,
      isDefaultView: true,
      systemFields: [FIELD_TYPE._STATUS, FIELD_TYPE._PRIORITY],
    });
    await this.createView({
      manager,
      name: VIEW_TYPE.BOARD,
      listId,
      userId,
      type: VIEW_TYPE.BOARD,
      isDefaultView: true,
      systemFields: [FIELD_TYPE._STATUS, FIELD_TYPE._PRIORITY],
    });

    return listViewId;
  }

  async createView(options: CreateViewOptions) {
    const { manager, listId, userId, name, type, isDefaultView, systemFields } =
      options;
    const ViewRepo = manager.getRepository(View);
    const ViewSystemFieldRepo = manager.getRepository(ViewSystemField);

    const { id } = await ViewRepo.save({
      name,
      type,
      listId,
      isDefaultView,
      createdById: userId,
    });

    if (systemFields) {
      for await (const field of systemFields) {
        await ViewSystemFieldRepo.save({ viewId: id, name: field });
      }
    }

    return id;
  }

  async findViews(options: GetViewsOptions) {
    const { manager, listId, userId } = options;
    const ViewRepo = manager.getRepository(View);

    return await ViewRepo.find({ where: { listId, createdById: userId } });
  }

  async findView(viewId: string) {
    return await View.findOneOrFail({
      where: { id: viewId },
      relations: { list: { space: true } },
    });
  }
}
