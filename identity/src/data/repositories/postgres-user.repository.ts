/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource } from "typeorm";
import { UserCredentialsDTO, UserUpdateDto } from "../../dtos/user";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./interfaces/user-repository.interface";

export class PostgresUserRepository implements UserRepository {
  private readonly _context;

  constructor(container: { postgresContext: DataSource }) {
    this._context = container.postgresContext;
  }

  /**
   * Creates a new user.
   *
   * @param {UserCredentialsDTO} user Object that represents the user to be created
   * @returns {Promise<UserEntity>}
   */
  save = async (user: UserCredentialsDTO): Promise<UserEntity> => {
    const { email, password } = user;

    const query = this._context
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({ email, password })
      .returning(["id"]);

    const result = await query.execute();

    return result.raw[0];
  };

  /**
   * Checks if user exists, by id
   *
   * @param id
   */
  existsById = async (id: string): Promise<boolean> => {
    const result = await this._context.query(
      "SELECT * FROM user_exists_by_id($1)",
      [id],
    );

    return result[0].user_exists_by_id;
  };

  /**
   * Checks if user exists, by email
   *
   * @param email
   * @returns
   */
  existsByEmail = async (email: string): Promise<boolean> => {
    const result = await this._context.query(
      "SELECT * FROM user_exists_by_email($1)",
      [email],
    );

    return result[0].user_exists_by_email;
  };

  /**
   * Find the user by user's id
   *
   * @param id
   * @returns
   */
  findById = async (id: string): Promise<UserEntity | null> => {
    const result = await this._context.query(
      "SELECT * FROM find_user_by_id($1)",
      [id],
    );

    return result[0];
  };

  /**
   * Updates an existing user.
   *
   * @param id - id of the user to be updated
   * @param user - object that represents the new updated user
   * @returns {Promise<UserEntity>}
   */
  update = async (id: string, user: UserUpdateDto): Promise<UserEntity> => {
    const { email, password, isEmailVerified } = user;

    const query = this._context.createQueryBuilder().update(UserEntity);

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
    throw new Error("Method not implemented.");
  };

  /**
   * Update password
   */
  updatePassword = async (id: string, password: string): Promise<boolean> => {
    const query = this._context
      .createQueryBuilder()
      .update(UserEntity)
      .set({ password })
      .where("id = :id", { id });

    const result = await query.execute();

    return result.affected == 1;
  };

  /**
   * Soft delete an existing user (kinda like archive)
   *
   * @param id
   * @returns {Promise<void>}
   */
  softDelete = async (id: string): Promise<void> => {
    const query = this._context
      .createQueryBuilder()
      .softDelete()
      .where("id = :id", { id })
      .returning(["id"]);

    const result = await query.execute();

    return result.raw[0];
  };
}
