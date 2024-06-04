import { EventBus } from "./interfaces/event-bus";
import { AppLogger } from "@issue-tracker/server-core";
import { ConnectionOptions, NatsConnection, connect } from "nats";

export class NatsEventBus implements EventBus {
  public client?: NatsConnection;

  constructor(
    private readonly opts: ConnectionOptions,
    private readonly logger?: AppLogger,
  ) {
    this.logger = logger;
    this.opts = opts;
  }

  init = async () => {
    const client = await connect(this.opts);
    this.client = client;

    this.logger?.info(`✅ Server connected to ${client.info?.server_name}`);
  };
}
