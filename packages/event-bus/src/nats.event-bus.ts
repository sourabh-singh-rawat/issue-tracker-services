import { EventBus } from "./interfaces/event-bus";
import { AppLogger } from "@issue-tracker/server-core";
import { NatsConnection, connect } from "nats";

interface NatsEventBusOptions {
  servers: string[];
  streams?: string[];
  logger?: AppLogger;
}

export class NatsEventBus implements EventBus {
  public client?: NatsConnection;

  constructor(private readonly options: NatsEventBusOptions) {}

  private createStreams = async (streams: string[] = []) => {
    const jsm = await this.client?.jetstreamManager();
    streams.forEach(async (stream) => {
      const found = jsm?.streams.get(stream);
      if (!found) {
        await jsm?.streams.add({ name: stream, subjects: [`${stream}.*`] });
      }
    });
  };

  init = async () => {
    const client = await connect({ servers: this.options.servers });
    this.client = client;
    this.createStreams(this.options.streams);

    this.options.logger?.info(
      `✅ Server connected to ${client.info?.server_name}`,
    );
  };
}
