import { describe, expect, it, vi } from "vitest";
import { connect } from "nats";
import type { IBrokerOptions } from "./IBrokerOptions";
import { NatsBroker } from "./NatsBroker";

vi.mock("nats");

describe("Nats Broker Unit Test", () => {
  it("initializes nats broker with correct options", async () => {
    const options: IBrokerOptions = {
      servers: ["nats"],
      streams: ["user"],
    };
    const nats = new NatsBroker(options);

    expect(nats.getConfig()).toBe(options);
  });

  it("should initialize NATS connection using nats server options", async () => {
    const options: IBrokerOptions = {
      servers: ["localhost:4222"],
    };
    const broker = new NatsBroker(options);

    await broker.init();

    expect(connect).toHaveBeenCalledTimes(1);
  });
});
