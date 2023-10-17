import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./interfaces/user.repository";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Find the user by id
   * @param id
   * @returns User if found or null
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

    return result[0] as UserEntity;
  };

  /**
   * Checks if user exists, by email
   * @param email
   * @returns true if user exists, false otherwise
   */
  existsByEmail = async (email: string): Promise<boolean> => {
    const result = await this.databaseService.query<{
      user_exists_by_email: boolean;
    }>("SELECT * FROM user_exists_by_email($1)", [email]);

    return result[0].user_exists_by_email;
  };

  /**
   * Creates a new user.
   * @param user Object that represents the user to be created
   */
  save = async (user: UserEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(UserEntity, "u", queryRunner)
      .insert()
      .into(UserEntity)
      .values(user)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as UserEntity;
  };

  /**
   * Checks if user exists, by id
   * @param id
   */
  existsById = async (id: string): Promise<boolean> => {
    const result = await this.databaseService.query<{
      user_exists_by_id: boolean;
    }>("SELECT * FROM user_exists_by_id($1)", [id]);

    return result[0].user_exists_by_id;
  };

  /**
   * Updates an existing user by ID.
   * @param id The ID of the user to be updated.
   * @param updateUser Partial object containing fields to be updated.
   * @param options Additional query builder options.
   */
  update = async (
    id: string,
    updatedUser: UserEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(UserEntity, "u", queryRunner)
      .update(UserEntity)
      .set(updatedUser)
      .where("id = :id", { id })
      .returning("*");

    await query.execute();
  };

  /**
   * Soft delete an existing user (kinda like archive)
   * @param id
   */
  softDelete = async (
    id: string,
    options?: QueryBuilderOptions,
  ): Promise<void> => {
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .createQueryBuilder(UserEntity, "users", queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
