import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserRepository } from "./interfaces/user-repository";
import { UserEntity } from "../entities/user.entity";
import { RegisteredServices } from "../../app/service-container";

export class PostgresUserRepository implements UserRepository {
  private readonly databaseService;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
  }

  /**
   * Creates a new user.
   * @param user Object that represents the user to be created
   * @returns
   */
  save = async (user: UserEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(UserEntity, "u", queryRunner)
      .insert()
      .into(UserEntity)
      .values(user)
      .returning(["id", "email"]);

    return (await query.execute()).raw[0];
  };

  /**
   * Checks if user exists, by id
   * @param id
   * @returns true if user exists, false otherwise
   */
  existsById = async (id: string) => {
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
  existsByEmail = async (email: string) => {
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

    console.log(result);

    return result[0];
  };

  /**
   * Finds a user by their email address
   * @param email
   * @returns User if found or null
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
      .createQueryBuilder(UserEntity, "u", queryRunner)
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
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(UserEntity, "users", queryRunner)
      .softDelete()
      .where("id = :id", { id });

    await query.execute();
  };
}
