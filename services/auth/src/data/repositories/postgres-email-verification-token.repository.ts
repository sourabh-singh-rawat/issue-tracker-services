import { EmailVerificationTokenRepository } from "./interfaces/email-verification.repository";
import { Typeorm } from "@issue-tracker/orm";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { EmailVerificationToken } from "../entities/email-verification-token.entity";

export class PostgresEmailVerificationTokenRepository
  implements EmailVerificationTokenRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    email: EmailVerificationToken,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.orm
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(EmailVerificationToken)
      .values(email)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as EmailVerificationToken;
  };

  findOne = async (id: string) => {
    return await EmailVerificationToken.findOne({ where: { id } });
  };

  existsById = async (id: string) => {
    return await EmailVerificationToken.exists({ where: { id } });
  };

  update = async (
    id: string,
    entity: EmailVerificationToken,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(EmailVerificationToken)
      .set(entity)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
