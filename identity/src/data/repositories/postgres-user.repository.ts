import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./interfaces/user-repository.interface";
import { QueryBuilderOptions } from "./interfaces/query-builder-options.interface";
import { Injectables } from "../../app";

export class PostgresUserRepository implements UserRepository {
  private readonly _context;

  constructor(container: Injectables) {
    this._context = container.postgresContext;
  }

  /**
   * Creates a new user.
   * @param user Object that represents the user to be created
   * @returns
   */
  save = async (
    user: UserEntity,
    options?: QueryBuilderOptions,
  ): Promise<UserEntity> => {
    const { email, passwordHash, passwordSalt } = user;
    const queryRunner = options?.queryRunner;

    const query = this._context
      .queryBuilder(UserEntity, "u", queryRunner)
      .insert()
      .into(UserEntity)
      .values({ email, passwordHash, passwordSalt })
      .returning("*");

    return (await query.execute()).raw[0];
  };

  /**
   * Checks if user exists, by id
   * @param id
   * @returns true if user exists, false otherwise
   */
  existsById = async (id: string): Promise<boolean> => {
    const result = await this._context.query<{ user_exists_by_id: boolean }>(
      "SELECT * FROM user_exists_by_id($1)",
      [id],
    );

    return result[0].user_exists_by_id;
  };

  /**
   * Checks if user exists, by email
   * @param email
   * @returns true if user exists, false otherwise
   */
  existsByEmail = async (email: string): Promise<boolean> => {
    const result = await this._context.query<{ user_exists_by_email: boolean }>(
      "SELECT * FROM user_exists_by_email($1)",
      [email],
    );

    return result[0].user_exists_by_email;
  };

  /**
   * Find the user by user's id
   * @param id
   * @returns User if found or null
   */
  findById = async (id: string): Promise<UserEntity | null> => {
    const result = await this._context.query<UserEntity>(
      "SELECT * FROM find_user_by_id($1)",
      [id],
    );

    return result[0];
  };

  /**
   * Finds a user by their email address
   * @param email
   * @returns
   */
  findByEmail = async (email: string): Promise<UserEntity | null> => {
    const result = await this._context.query<UserEntity>(
      "SELECT * FROM find_user_by_email($1)",
      [email],
    );

    return result[0];
  };

  /**
   *
   */
  updateEmail = async (id: string, email: string): Promise<boolean> => {
    console.log(id, email);
    throw new Error("Method not implemented.");
  };

  /**
   * Update password
   */
  updatePassword = async (
    id: string,
    password: string,
    options: QueryBuilderOptions,
  ): Promise<boolean> => {
    const { queryRunner } = options;

    const query = this._context
      .queryBuilder(UserEntity, "users", queryRunner)
      .update(UserEntity)
      .set({ passwordHash: password })
      .where("id = :id", { id });

    const result = await query.execute();

    return result.affected == 1;
  };

  /**
   * Soft delete an existing user (kinda like archive)
   * @param id
   * @returns {Promise<void>}
   */
  softDelete = async (
    id: string,
    options?: QueryBuilderOptions,
  ): Promise<void> => {
    const queryRunner = options?.queryRunner;

    const query = this._context
      .queryBuilder(UserEntity, "users", queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
