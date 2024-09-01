import { connect } from "nats";
import { NatsBroker } from "../nats.broker";
import { BrokerOptions } from "../interfaces";

jest.mock("nats");

describe("Nats Broker Unit Test", () => {
  it("initializes nats broker with correct options", async () => {
    const options: BrokerOptions = {
      servers: ["nats"],
      streams: ["user"],
    };
    const nats = new NatsBroker(options);

    expect(nats.getConfig()).toBe(options);
  });

  it("should initialize NATS connection using nats server options", async () => {
    const options: BrokerOptions = {
      servers: ["localhost:4222"],
    };
    const broker = new NatsBroker(options);

    await broker.init();

    expect(connect).toHaveBeenCalledTimes(1);
  });
});
