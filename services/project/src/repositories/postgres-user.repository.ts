import { Typeorm } from "@issue-tracker/orm";
import { UserEntity } from "../app/entities/user.entity";
import { UserRepository } from "./interfaces/user.repository";
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

  updateUser = async (
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(UserEntity)
      .set(updatedUser)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
