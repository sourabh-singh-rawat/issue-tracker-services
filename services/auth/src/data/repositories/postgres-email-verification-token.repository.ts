import { EmailVerificationTokenRepository } from "./interfaces/email-verification.repository";
import { Typeorm } from "@issue-tracker/orm";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { EmailVerificationTokenEntity } from "../entities/email-verification-token.entity";

export class PostgresEmailVerificationTokenRepository
  implements EmailVerificationTokenRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    email: EmailVerificationTokenEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.orm
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(EmailVerificationTokenEntity)
      .values(email)
      .returning("*");

    return (await query.execute())
      .generatedMaps[0] as EmailVerificationTokenEntity;
  };

  findOne = async (id: string) => {
    return await EmailVerificationTokenEntity.findOne({ where: { id } });
  };

  existsById = async (id: string) => {
    return await EmailVerificationTokenEntity.exists({ where: { id } });
  };

  update = async (
    id: string,
    entity: EmailVerificationTokenEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(EmailVerificationTokenEntity)
      .set(entity)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
