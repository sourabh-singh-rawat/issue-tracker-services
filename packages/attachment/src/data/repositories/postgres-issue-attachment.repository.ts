import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { IssueAttachmentRepository } from "./interfaces/issue-attachment.repository";
import { IssueAttachmentEntity } from "../entities";

export class PostgresIssueAttachmentRepository
  implements IssueAttachmentRepository
{
  constructor(private readonly postgresTypeormStore: TypeormStore) {}

  save = async (
    attachment: IssueAttachmentEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueAttachmentEntity)
      .values(attachment)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueAttachmentEntity;
  };

  find = async (id: string) => {
    const result = await this.postgresTypeormStore.query(
      "SELECT * FROM find_issue_attachments($1)",
      [id],
    );

    return result as IssueAttachmentEntity[];
  };

  /**
   * Checks if attachment exists, by id
   * @param id
   * @returns true if attachment exists, false otherwise
   */
  existsById = async (id: string): Promise<boolean> => {
    const result = await this.postgresTypeormStore.query<{
      userExistsById: boolean;
    }>("SELECT * FROM user_exists_by_id($1)", [id]);

    return result[0].userExistsById;
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
