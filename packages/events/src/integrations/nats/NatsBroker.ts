import { NatsConnection, connect } from "nats";
import type { IBroker } from "./IBroker";
import type { IBrokerOptions } from "./IBrokerOptions";

export class NatsBroker implements IBroker {
  public client!: NatsConnection;

  constructor(private readonly options: IBrokerOptions) {}

  getConfig() {
    return this.options;
  }

  private async createStreams(streams: IBrokerOptions["streams"] = []) {
    const jetstreamManager = await this.client.jetstreamManager();

    streams.forEach(async (stream) => {
      await jetstreamManager.streams.add({
        name: stream,
        subjects: [`${stream}.>`],
      });
    });
  }

  async init() {
    const client = await connect({ servers: this.options.servers });
    this.client = client;
    this.createStreams(this.options.streams);

    this.options.logger?.info(
      `✅ [Nats Jetstream] connected at ${client.info?.host}:${client.info?.port}`,
    );
  }
}
