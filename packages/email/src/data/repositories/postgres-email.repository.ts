import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { EmailEntity } from "../entities/email.entity";
import { EmailRepository } from "./interfaces/email.repository";

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
    throw new Error("Method not implemented.");
  };

  findByEmail = async (id: string) => {
    const result = await this.store.query<EmailEntity>(
      "SELECT * FROM find_by_email($1)",
      [id],
    );

    return result[0] as EmailEntity | null;
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
