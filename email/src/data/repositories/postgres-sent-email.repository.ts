import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { SentEmailEntity } from "../entities/sent-emails.entity";
import { SentEmailRepository } from "./interfaces/sent-email.repository";

export class PostgresSentEmailRepository implements SentEmailRepository {
  constructor(private databaseService: DatabaseService) {}

  save = async (sentEmail: SentEmailEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(SentEmailEntity)
      .values(sentEmail)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as SentEmailEntity;
  };

  existsById = async (id: string) => {
    throw new Error("Method not implemented.");
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
