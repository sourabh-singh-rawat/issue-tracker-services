import { IssueAttachmentRepository } from "./interfaces/issue-attachment.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { Typeorm } from "@issue-tracker/orm";
import { IssueAttachmentEntity } from "../entities";

export class PostgresIssueAttachmentRepository
  implements IssueAttachmentRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    attachment: IssueAttachmentEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueAttachmentEntity)
      .values(attachment)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueAttachmentEntity;
  };

  find = async (id: string) => {
    return await IssueAttachmentEntity.find({ where: { issueId: id } });
  };

  existsById = async (id: string) => {
    return await IssueAttachmentEntity.exists({ where: { id } });
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
