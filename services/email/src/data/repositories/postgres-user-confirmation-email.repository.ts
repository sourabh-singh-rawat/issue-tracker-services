import { QueryBuilderOptions, Typeorm } from "@issue-tracker/orm";
import { UserEmailConfirmationEntity } from "../entities/user-email-confirmation.entity";
import { UserEmailConfirmationRepository } from "./interfaces/user-email-confirmation.repository";
import { NotFoundError } from "@issue-tracker/common";

export class PostgresUserEmailConfirmationRepository
  implements UserEmailConfirmationRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    userEmailConfirmation: UserEmailConfirmationEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserEmailConfirmationEntity)
      .values(userEmailConfirmation)
      .returning("*");

    return (await query.execute())
      .generatedMaps[0] as UserEmailConfirmationEntity;
  };

  existsById = async (id: string) => {
    return await UserEmailConfirmationEntity.existsBy({ id });
  };

  update = async (
    id: string,
    entity: UserEmailConfirmationEntity,
    options?: QueryBuilderOptions | undefined,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(UserEmailConfirmationEntity)
      .set(entity)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string) => {
    const userEmailConfirmation = await UserEmailConfirmationEntity.findOne({
      where: { id },
    });
    if (!userEmailConfirmation) {
      throw new NotFoundError("User confirmation email");
    }

    await userEmailConfirmation.softRemove();
  };
}
