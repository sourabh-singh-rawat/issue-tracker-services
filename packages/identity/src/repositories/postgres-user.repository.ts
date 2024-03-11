import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserRepository } from "./interfaces/user-repository";
import { UserEntity } from "../app/entities/user.entity";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly store: TypeormStore) {}

  save = async (user: UserEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserEntity)
      .values(user)
      .returning(["id", "email"]);

    return (await query.execute()).raw[0];
  };

  existsById = async (id: string) => {
    return await UserEntity.exists({ where: { id } });
  };

  existsByEmail = async (email: string) => {
    return await UserEntity.exists({ where: { email } });
  };

  findById = async (id: string) => {
    return await UserEntity.findOne({ where: { id } });
  };

  findByEmail = async (email: string) => {
    return await UserEntity.findOne({ where: { email } });
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
    const query = this.store
      .createQueryBuilder(queryRunner)
      .update(UserEntity)
      .set(updatedUser)
      .where("id = :id", { id })
      .returning("*");

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const query = this.store
      .createDeleteQueryBuilder(UserEntity, "u", options?.queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
