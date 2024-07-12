import { QueryBuilderOptions, Typeorm } from "@issue-tracker/orm";
import { ConfirmationEmailEntity } from "../entities/confirmation-email.entity";
import { UserEmailConfirmationRepository } from "./interfaces/user-email-confirmation.repository";
import { NotFoundError } from "@issue-tracker/common";

export class PostgresUserEmailConfirmationRepository
  implements UserEmailConfirmationRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    userEmailConfirmation: ConfirmationEmailEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(ConfirmationEmailEntity)
      .values(userEmailConfirmation)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as ConfirmationEmailEntity;
  };

  existsById = async (id: string) => {
    return await ConfirmationEmailEntity.existsBy({ id });
  };

  update = async (
    id: string,
    entity: ConfirmationEmailEntity,
    options?: QueryBuilderOptions | undefined,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(ConfirmationEmailEntity)
      .set(entity)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string) => {
    const userEmailConfirmation = await ConfirmationEmailEntity.findOne({
      where: { id },
    });
    if (!userEmailConfirmation) {
      throw new NotFoundError("User confirmation email");
    }

    await userEmailConfirmation.softRemove();
  };
}
