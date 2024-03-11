import { Logger } from "pino";
import { DataSource } from "typeorm";
import TypeORMAdapter from "typeorm-adapter";
import { Enforcer, newEnforcer } from "casbin";
import { TypeORMAdapterConfig } from "typeorm-adapter/lib/adapter";
import { MissingEnforcerError } from "../errors/missing-enforcer.error";

export abstract class Guardian<A extends string> {
  protected casbinEnforcer?: Enforcer;

  constructor(private readonly logger: Logger) {}

  /**
   * Saves the policy to database
   * @param subject
   * @param object
   * @param action
   * @returns
   */
  savePolicy = async (subject: string, object: string, action: string) => {
    return await this.enforcer.addPolicy(subject, object, action);
  };

  /**
   * Saves the inheritence rule to database
   * @param parent
   * @param child
   */
  saveGroupingPolicy = async (parent: string, child: string) => {
    await this.enforcer.addGroupingPolicy(parent, child);
  };

  /**
   * Save role for the user
   * @param userId
   * @param roleId
   * @returns
   */
  saveRoleForUser = async (userId: string, roleId: string) => {
    return await this.enforcer.addRoleForUser(userId, roleId);
  };

  /**
   * Get role for the user on a object
   * @param userId
   * @param object
   * @returns
   */
  getRoleForUser = async (userId: string, object: string) => {
    const roles = await this.enforcer.getRolesForUser(userId);
    const role = roles.find((role) => role.includes(object));

    return role;
  };

  /**
   * Get all permission for user on a object
   * @param userId
   * @param object
   * @returns
   */
  getPermissionsForUser = async (userId: string, object: string) => {
    const userRole = await this.getRoleForUser(userId, object);

    if (!userRole) return [];

    return await this.enforcer?.getImplicitPermissionsForUser(userRole);
  };

  /**
   *
   * @param userId
   * @param resourceId
   * @param actionId
   * @returns
   */
  enforce = (userId: string, resourceId: string, actionId: A) => {
    return this.enforcer.enforceSync(userId, resourceId, actionId);
  };

  /**
   * Initializes the enforcer and saves the default policies
   * @param dataSource
   * @param config
   */
  initialize = async (dataSource: DataSource, config: TypeORMAdapterConfig) => {
    const adapter = await TypeORMAdapter.newAdapter(
      { connection: dataSource.manager.connection },
      { customCasbinRuleEntity: config.customCasbinRuleEntity },
    );

    this.casbinEnforcer = await newEnforcer(
      "./src/app/guardians/casbin/model.conf",
      adapter,
    );
    this.logger.info("Initialized policy manager and connected to database");
  };

  /**
   *
   * @param subjectId
   * @param objectId
   * @param actionId
   */
  abstract validatePermission(
    subjectId: string,
    objectId: string,
    actionId: A,
  ): Promise<void>;

  /**
   * Enforcer getter
   */

  public get enforcer() {
    if (!this.casbinEnforcer) throw new MissingEnforcerError();

    return this.casbinEnforcer;
  }
}
