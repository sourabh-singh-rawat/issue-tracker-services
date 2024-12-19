import { ListCustomField, StatusOption } from "../../data";
import { FieldValue } from "../../data/entities/FieldValue";
import {
  CreateFieldValueOptions,
  CustomFieldService,
  FindCustomFieldsOptions,
  StatusService,
  UpdateStatusFieldOptions,
} from "./interfaces";

export enum CoreField {
  Status = "Status",
  Priority = "Priority",
}

export class CoreCustomFieldService implements CustomFieldService {
  constructor(private readonly statusService: StatusService) {}

  async createLookupField() {}

  async updateStatusField(options: UpdateStatusFieldOptions) {
    const { manager, value } = options;
    const StatusOptionRepo = manager.getRepository(StatusOption);
    const CustomFieldRepo = manager.getRepository(FieldValue);

    await StatusOptionRepo.findOneOrFail({ where: { name: value } });
    await CustomFieldRepo.update({ id: CoreField.Status }, {});
  }

  async findCustomFields(options: FindCustomFieldsOptions) {
    const { listId, manager } = options;
    const ListCustomFieldRepo = manager.getRepository(ListCustomField);

    return await ListCustomFieldRepo.find({ where: { listId } });
  }

  async createFieldValue(options: CreateFieldValueOptions) {
    const { manager, id, value } = options;
    const CustomFieldRepo = manager.getRepository(FieldValue);

    await CustomFieldRepo.update({ id }, { value });
  }
}
