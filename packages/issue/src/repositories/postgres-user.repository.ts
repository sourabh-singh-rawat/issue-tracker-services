import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../app/entities/user.entity";
import { UserRepository } from "./interfaces/user.repository";

export class PostgresUserRepository implements UserRepository {
  constructor(private store: TypeormStore) {}

  save = async (user: UserEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserEntity)
      .values(user)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as UserEntity;
  };

  updateUser = async (
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .update(UserEntity)
      .set(updatedUser)
      .where("id = :id", { id });

    await query.execute();
  };

  findById = async (id: string) => {
    return await UserEntity.findOne({ where: { id } });
  };

  existsById = async (id: string) => {
    return await UserEntity.exists({ where: { id } });
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
