import { NatsBroker } from "../nats.broker";

describe("Nats Broker Integration Test", () => {
  const broker = new NatsBroker({
    servers: ["localhost:14222"],
    streams: ["user"],
  });

  it("connects to a nats cluster", async () => {
    await broker.init();
  });

  it.todo("creates stream if it does not exist");
});
