import TypeORMAdapter from "typeorm-adapter";
import { Enforcer, newEnforcer } from "casbin";
import { Services } from "./container.config";
import { WorkspaceMemberRoles } from "../data/entities/workspace-member-roles";

export class Casbin {
  private readonly _logger;
  private readonly _dbSource;
  private _enforcer?: Enforcer;

  constructor(container: Services) {
    this._logger = container.logger;
    this._dbSource = container.dbSource;
  }

  /**
   * Creates an adapter
   */
  connect = async () => {
    const adapter = await TypeORMAdapter.newAdapter(
      { connection: this._dbSource.manager.connection },
      {
        customCasbinRuleEntity: WorkspaceMemberRoles,
      },
    );

    this._enforcer = await newEnforcer("./src/app/model.conf", adapter);
    this._logger.info("Server connected to policy storage, enforcer added");
  };

  enforce = async () => {
    if (!this._enforcer) {
      throw new Error("Enforcer not found");
    }

    await this._enforcer.loadFilteredPolicy({
      ptype: "p",
      v0: "alice",
    });

    await this._enforcer.enforce("alice", "data1", "read");

    await this._enforcer.savePolicy();
  };
}
