/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource } from "typeorm";
import { UserCreateDto, UserUpdateDto } from "../../dtos/user";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./interfaces/user-repository.interface";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class PostgresUserRepository implements UserRepository {
  private readonly _context;

  constructor(container: { postgresContext: DataSource }) {
    this._context = container.postgresContext;
  }

  /**
   * Creates a new user.
   *
   * @param {UserCreateDto} user Object that represents the user to be created
   * @returns {Promise<UserEntity>}
   */
  save = async (user: UserCreateDto): Promise<UserEntity> => {
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

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  count(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
