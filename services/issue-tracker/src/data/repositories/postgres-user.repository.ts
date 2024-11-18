import { QueryBuilderOptions } from "@issue-tracker/orm";
import { User } from "../entities/User";
import { UserRepository } from "./interfaces/user.repository";
import { Typeorm } from "@issue-tracker/orm";

export class PostgresUserRepository implements UserRepository {
  constructor(private orm: Typeorm) {}

  findByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
  };

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

  updateUser = async (
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

  findById = async (id: string) => {
    return await User.findOne({ where: { id } });
  };

  existsById = async (id: string) => {
    return await User.exists({ where: { id } });
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
