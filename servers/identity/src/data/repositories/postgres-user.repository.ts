import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { UserRepository } from "./interfaces/user-repository";
import { UserEntity } from "../entities/user.entity";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Creates a new user.
   * @param user Object that represents the user to be created
   */
  save = async (user: UserEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserEntity)
      .values(user)
      .returning(["id", "email"]);

    return (await query.execute()).raw[0];
  };

  /**
   * Checks if user exists, by id
   * @param id
   */
  existsById = async (id: string) => {
    const result = await this.databaseService.query<{
      userExistsById: boolean;
    }>("SELECT * FROM user_exists_by_id($1)", [id]);

    return result[0].userExistsById;
  };

  /**
   * Checks if user exists, by email
   * @param email
   */
  existsByEmail = async (email: string) => {
    const result = await this.databaseService.query<{
      userExistsByEmail: boolean;
    }>("SELECT * FROM user_exists_by_email($1)", [email]);

    return result[0].userExistsByEmail;
  };

  /**
   * Find the user by user's id
   * @param id
   */
  findById = async (id: string): Promise<UserEntity | null> => {
    const result = await this.databaseService.query<UserEntity>(
      "SELECT * FROM find_user_by_id($1)",
      [id],
    );

    return result[0];
  };

  /**
   * Finds a user by their email address
   * @param email
   */
  findByEmail = async (email: string): Promise<UserEntity | null> => {
    const result = await this.databaseService.query<UserEntity>(
      "SELECT * FROM find_user_by_email($1)",
      [email],
    );

    return result[0];
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
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .update(UserEntity)
      .set(updatedUser)
      .where("id = :id", { id })
      .returning("*");

    await query.execute();
  };

  /**
   * Soft delete an existing user (kinda like archive)
   */
  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const query = this.databaseService
      .createDeleteQueryBuilder(UserEntity, "u", options?.queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
