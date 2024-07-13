import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { ConfirmationEmailEntity } from "../../entities/confirmation-email.entity";

export interface UserEmailConfirmationRepository
  extends Repository<ConfirmationEmailEntity> {
  update(
    id: string,
    entity: ConfirmationEmailEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
