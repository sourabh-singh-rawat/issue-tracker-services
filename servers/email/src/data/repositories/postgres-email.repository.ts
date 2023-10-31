import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { EmailEntity } from "../entities/email.entity";
import { EmailRepository } from "./interfaces/email.repository";

export class PostgresEmailRepository implements EmailRepository {
  constructor(private databaseService: DatabaseService) {}

  save = async (sentEmail: EmailEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
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

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
