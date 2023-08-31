import { UserCredentialsDTO, UserUpdateDto } from "../../dtos/user";
import { UserEntity } from "../entities/user.entity";
import {
  UserRepository,
  RepositoryOptions,
} from "./interfaces/user-repository.interface";
import { PostgresContext } from "@sourabhrawatcc/core-utils";

export class PostgresUserRepository implements UserRepository {
  private readonly _context;

  constructor(container: { postgresContext: PostgresContext }) {
    this._context = container.postgresContext;
  }

  /**
   * Creates a new user.
   * @param {UserCredentialsDTO} user Object that represents the user to be created
   * @returns {Promise<UserEntity>}
   */
  save = async (
    user: UserCredentialsDTO,
    { t }: RepositoryOptions,
  ): Promise<UserEntity> => {
    const { email, password } = user;

    const query = this._context
      .queryBuilder(UserEntity, "users", t)
      .insert()
      .into(UserEntity)
      .values({ email, password })
      .returning(["id", "email"]);

    const result = await query.execute();

    return result.raw[0];
  };

  /**
   * Checks if user exists, by id
   *
   * @param id
   */
  existsById = async (id: string): Promise<boolean> => {
    const result = await this._context.query<any>(
      "SELECT * FROM user_exists_by_id($1)",
      [id],
    );

    return result[0].user_exists_by_id;
  };

  /**
   * Checks if user exists, by email
   * @param email
   * @returns
   */
  existsByEmail = async (email: string): Promise<boolean> => {
    const result = await this._context.query<any>(
      "SELECT * FROM user_exists_by_email($1)",
      [email],
    );

    return result[0].user_exists_by_email;
  };

  /**
   * Find the user by user's id
   * @param id
   * @returns
   */
  findById = async (id: string): Promise<UserEntity | null> => {
    const result = await this._context.query<any>(
      "SELECT * FROM find_user_by_id($1)",
      [id],
    );

    return result[0];
  };

  /**
   * Updates an existing user.
   * @param id - id of the user to be updated
   * @param user - object that represents the new updated user
   * @returns {Promise<UserEntity>}
   */
  update = async (
    id: string,
    user: UserUpdateDto,
    { t }: RepositoryOptions,
  ): Promise<UserEntity> => {
    const { email, password, isEmailVerified } = user;

    const query = this._context
      .queryBuilder(UserEntity, "users", t)
      .update(UserEntity);

    if (email) query.set({ email });
    if (password) query.set({ password });
    if (isEmailVerified) query.set({ isEmailVerified });

    query.where("id = :id", { id }).returning(["id"]);

    const result = await query.execute();

    return result.raw[0];
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
    { t }: RepositoryOptions,
  ): Promise<boolean> => {
    const query = this._context
      .queryBuilder(UserEntity, "users", t)
      .update(UserEntity)
      .set({ password })
      .where("id = :id", { id });

    const result = await query.execute();

    return result.affected == 1;
  };

  /**
   * Soft delete an existing user (kinda like archive)
   * @param id
   * @returns {Promise<void>}
   */
  softDelete = async (id: string, { t }: RepositoryOptions): Promise<void> => {
    const query = this._context
      .queryBuilder(UserEntity, "users", t)
      .softDelete()
      .where("id = :id", { id })
      .returning(["id"]);

    const result = await query.execute();

    return result.raw[0];
  };
}
