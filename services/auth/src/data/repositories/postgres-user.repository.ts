import { Typeorm } from "@issue-tracker/orm";
import { UserRepository } from "./interfaces/user.repository";
import { User } from "../entities";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly orm: Typeorm) {}

  save = async (user: User, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(User)
      .values(user)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as User;
  };

  existsById = async (id: string) => {
    return await User.exists({ where: { id } });
  };

  findById = async (id: string) => {
    return await User.findOne({ where: { id } });
  };

  existsByEmail = async (email: string) => {
    return await User.exists({ where: { email } });
  };

  findByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
  };

  update = async (
    id: string,
    updatedUser: User,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .update(User)
      .set(updatedUser)
      .where("id = :id", { id });

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
