import { BrokerOptions } from "./interfaces";
import { Broker } from "./interfaces/broker";
import { NatsConnection, connect } from "nats";

export class NatsBroker implements Broker {
  public client?: NatsConnection;

  constructor(private readonly options: BrokerOptions) {}

  getConfig() {
    return this.options;
  }

  private async createStreams(streams: BrokerOptions["streams"] = []) {
    const jetstreamManager = await this.client?.jetstreamManager();

    streams.forEach(async (stream) => {
      await jetstreamManager?.streams.add({
        name: stream,
        subjects: [`${stream}.*`],
      });
    });
  }

  async init() {
    const client = await connect({ servers: this.options.servers });
    this.client = client;
    this.createStreams(this.options.streams);

    this.options.logger?.info(
      `✅ Server connected to ${client.info?.server_name}`,
    );
  }
}
