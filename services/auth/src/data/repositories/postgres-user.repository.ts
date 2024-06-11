import { Typeorm } from "@issue-tracker/orm";
import { UserRepository } from "./interfaces/user.repository";
import { UserEntity } from "../entities";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (user: UserEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserEntity)
      .values(user)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as UserEntity;
  };

  existsById = async (id: string) => {
    return await UserEntity.exists({ where: { id } });
  };

  findById = async (id: string) => {
    return await UserEntity.findOne({ where: { id } });
  };

  existsByEmail = async (email: string) => {
    return await UserEntity.exists({ where: { email } });
  };

  findByEmail = async (email: string) => {
    return await UserEntity.findOne({ where: { email } });
  };

  update = async (
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(UserEntity)
      .set(updatedUser)
      .where("id = :id", { id })
      .returning("*");

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;

    const query = this.orm
      .createQueryBuilder(queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
