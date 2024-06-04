import { UserRepository } from "./interface/user-repository";
import { UserEntity } from "../entities";
import { Typeorm } from "@issue-tracker/orm";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresUserRepository implements UserRepository {
  constructor(private orm: Typeorm) {}

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

  existsById = async (id: string): Promise<boolean> => {
    return await UserEntity.exists({ where: { id } });
  };

  findById = async (id: string) => {
    return await UserEntity.findOne({ where: { id } });
  };

  findByEmail = async (email: string) => {
    return await UserEntity.findOne({ where: { email } });
  };

  existsByEmail = async (email: string) => {
    return await UserEntity.exists({ where: { email } });
  };

  updateEmail = async (id: string, email: string): Promise<boolean> => {
    console.log(id, email);
    throw new Error("Method not implemented.");
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
