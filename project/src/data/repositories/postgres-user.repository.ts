import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./interfaces/user.repository";
import { RegisteredServices } from "../../app/service-container";

export class PostgresUserRepository implements UserRepository {
  private readonly databaseService;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
  }

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

  existsById = async (id: string) => {
    throw new Error("Method not implemented.");
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
