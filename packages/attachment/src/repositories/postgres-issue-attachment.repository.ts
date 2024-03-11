import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { IssueAttachmentRepository } from "./interfaces/issue-attachment.repository";
import { IssueAttachmentEntity } from "../app/entities";

export class PostgresIssueAttachmentRepository
  implements IssueAttachmentRepository
{
  constructor(private readonly store: TypeormStore) {}

  save = async (
    attachment: IssueAttachmentEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
