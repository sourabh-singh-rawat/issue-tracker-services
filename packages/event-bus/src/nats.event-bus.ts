import { EventBus } from "./interfaces/event-bus";
import { AppLogger } from "@issue-tracker/server-core";
import { ConnectionOptions, NatsConnection, connect } from "nats";

export class NatsEventBus implements EventBus {
  public client?: NatsConnection;

  constructor(
    private readonly opts: ConnectionOptions,
    private readonly streams: string[],
    private readonly logger?: AppLogger,
  ) {
    this.logger = logger;
    this.opts = opts;
  }

  private createStreams = async (streams: string[]) => {
    const jsm = await this.client?.jetstreamManager();
    streams.forEach(async (stream) => {
      await jsm?.streams.add({ name: stream, subjects: [`${stream}.*`] });
    });
  };

  init = async () => {
    const client = await connect(this.opts);
    this.client = client;
    this.createStreams(this.streams);

    this.logger?.info(`✅ Server connected to ${client.info?.server_name}`);
  };
}
