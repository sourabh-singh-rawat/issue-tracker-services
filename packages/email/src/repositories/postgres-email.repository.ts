import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { EmailRepository } from "./interfaces/email.repository";
import { EmailEntity } from "../app/entities";

export class PostgresEmailRepository implements EmailRepository {
  constructor(private readonly store: TypeormStore) {}

  save = async (sentEmail: EmailEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
