import { Typeorm } from "@issue-tracker/orm";
import { EmailRepository } from "./interfaces/email.repository";
import { EmailEntity } from "../entities";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresEmailRepository implements EmailRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (sentEmail: EmailEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(EmailEntity)
      .values(sentEmail)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as EmailEntity;
  };

  existsById = async (id: string) => {
    return await EmailEntity.exists({ where: { id } });
  };

  findByEmail = async (email: string) => {
    return await EmailEntity.findOne({ where: { receiverEmail: email } });
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
