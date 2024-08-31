import { connect } from "nats";
import { NatsEventBus } from "../nats.event-bus";

jest.mock("nats");

describe("Nats Event Bus", () => {
  it("should initialize NATS connection using server options", async () => {
    const options = { servers: ["localhost:4222"] };
    const nats = new NatsEventBus(options);

    await nats.init();

    expect(connect).toHaveBeenCalled();
    expect(connect).toHaveBeenCalledWith(options);
  });
});
