import { Field, StatusOption } from "../../data";
import {
  CreateFieldValueOptions,
  CreatePriorityFieldOptions,
  CreateStatusFieldOptions,
  FieldService,
  FindFieldsOptions,
  StatusService,
  UpdateStatusFieldOptions,
} from "./interfaces";

export enum CoreField {
  Status = "Status",
  Priority = "Priority",
}

export class CoreFieldService implements FieldService {
  constructor(private readonly statusService: StatusService) {}

  async createStatusField(options: CreateStatusFieldOptions) {
    const { manager, listId } = options;
    const FieldRepo = manager.getRepository(Field);

    await this.statusService.createOptions({
      manager,
      listId,
      statuses: [
        { name: "Lead", type: "Active", orderIndex: 0 },
        { name: "Qualified Lead", type: "Active", orderIndex: 1 },
        { name: "Opportunity", type: "Active", orderIndex: 2 },
        { name: "Customer", type: "Active", orderIndex: 3 },
        { name: "Returning Customer", type: "Active", orderIndex: 4 },
        { name: "Inactive", type: "Active", orderIndex: 5 },
        { name: "Hot Lead", type: "Active", orderIndex: 6 },
        { name: "Cold Lead", type: "Active", orderIndex: 7 },
        { name: "Prospect", type: "Active", orderIndex: 8 },
      ],
    });

    const { id } = await FieldRepo.save({
      name: CoreField.Status,
      type: "_Status",
      listId,
    });

    return id;
  }

  async createPriorityField(options: CreatePriorityFieldOptions) {
    const { manager, listId } = options;
    const FieldRepo = manager.getRepository(Field);

    // TODO: Priority field options

    const { id } = await FieldRepo.save({
      name: CoreField.Priority,
      type: "_Priority",
      listId,
    });

    return id;
  }

  async createLookupField() {}

  async updateStatusField(options: UpdateStatusFieldOptions) {
    const { manager, value } = options;
    const StatusOptionRepo = manager.getRepository(StatusOption);
    const FieldRepo = manager.getRepository(Field);

    await StatusOptionRepo.findOneOrFail({ where: { name: value } });
    await FieldRepo.update({ name: CoreField.Status }, {});
  }

  async findFields(options: FindFieldsOptions) {
    const { listId, manager } = options;
    const FieldRepo = manager.getRepository(Field);

    return await FieldRepo.find({ where: { listId } });
  }

  async createFieldValue(options: CreateFieldValueOptions) {
    const { manager, id, value } = options;
    const FieldRepo = manager.getRepository(Field);

    await FieldRepo.update({ id }, { value });
  }
}
