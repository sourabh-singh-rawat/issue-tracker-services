import { VerificationEmailRepository } from "./interfaces/verification-email.repository";
import { Typeorm } from "@issue-tracker/orm";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { VerificaionEmailEntity } from "../entities/verification-email.entity";

export class PostgresVerificationEmailRepository
  implements VerificationEmailRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    email: VerificaionEmailEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.orm
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(VerificaionEmailEntity)
      .values(email)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as VerificaionEmailEntity;
  };

  existsById = async (id: string) => {
    return await VerificaionEmailEntity.exists({ where: { id } });
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
