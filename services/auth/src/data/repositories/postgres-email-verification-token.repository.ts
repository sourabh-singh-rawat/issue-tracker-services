import { EmailVerificationTokenRepository } from "./interfaces/email-verification.repository";
import { Typeorm } from "@issue-tracker/orm";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { VerificationLink } from "../entities/VerificationLink";

export class PostgresEmailVerificationTokenRepository
  implements EmailVerificationTokenRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (email: VerificationLink, options?: QueryBuilderOptions) => {
    const query = this.orm
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(VerificationLink)
      .values(email)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as VerificationLink;
  };

  findOne = async (id: string) => {
    return await VerificationLink.findOne({ where: { id } });
  };

  existsById = async (id: string) => {
    return await VerificationLink.exists({ where: { id } });
  };

  update = async (
    id: string,
    entity: VerificationLink,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(VerificationLink)
      .set(entity)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
