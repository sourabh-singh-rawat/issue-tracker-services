import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./interface/user-repository";
import { RegisteredServices } from "../../app/service-container";

export class PostgresUserRepository implements UserRepository {
  private readonly databaseService;

  constructor(appServiceContainer: RegisteredServices) {
    this.databaseService = appServiceContainer.databaseService;
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
    const { id, email, defaultWorkspaceId } = user;
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .queryBuilder(UserEntity, "u", queryRunner)
      .insert()
      .into(UserEntity)
      .values({ id, email, defaultWorkspaceId })
      .returning("*");

    return (await query.execute()).generatedMaps[0] as UserEntity;
  };

  /**
   * Checks if user exists, by id
   * @param id
   * @returns true if user exists, false otherwise
   */
  existsById = async (id: string): Promise<boolean> => {
    const result = await this.databaseService.query<{
      user_exists_by_id: boolean;
    }>("SELECT * FROM user_exists_by_id($1)", [id]);

    return result[0].user_exists_by_id;
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
   * Find the user by user's id
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
   * @returns
   */
  findByEmail = async (email: string): Promise<UserEntity | null> => {
    const result = await this.databaseService.query<UserEntity>(
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
   * Soft delete an existing user (kinda like archive)
   * @param id
   * @returns {Promise<void>}
   */
  softDelete = async (
    id: string,
    options?: QueryBuilderOptions,
  ): Promise<void> => {
    const queryRunner = options?.queryRunner;

    const query = this.databaseService
      .queryBuilder(UserEntity, "users", queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
