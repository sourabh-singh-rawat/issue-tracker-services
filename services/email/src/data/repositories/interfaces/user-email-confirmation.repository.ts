import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { UserEmailConfirmationEntity } from "../../entities/user-email-confirmation.entity";

export interface UserEmailConfirmationRepository
  extends Repository<UserEmailConfirmationEntity> {
  update(
    id: string,
    entity: UserEmailConfirmationEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
