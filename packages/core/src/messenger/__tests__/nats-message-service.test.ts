import { ConnectionOptions } from "nats";
import { Logger } from "pino";
import { NatsMessenger } from "../nats-messager";

const mockConnectionValue = { info: { server_name: "mocked-server-name" } };
const mockConnection = jest.fn().mockResolvedValue(mockConnectionValue);
const mockConnectionOptions: ConnectionOptions = {};
const mockLogger: Logger = { ...jest.requireActual("pino"), info: jest.fn() };

it("should connect to nats cluster", async () => {
  const messageService = new NatsMessenger(
    mockConnection,
    mockConnectionOptions,
    mockLogger,
  );
  await messageService.connect();

  expect(mockConnection).toHaveBeenCalledWith(mockConnectionOptions);
  expect(messageService.client).toEqual(mockConnectionValue);
  expect(mockLogger.info).toHaveBeenCalledWith(
    "Server connected to mocked-server-name",
  );
});

it("console logs successful connection message", async () => {
  const messageService = new NatsMessenger(
    mockConnection,
    mockConnectionOptions,
    mockLogger,
  );
  await messageService.connect();

  expect(mockLogger.info).toHaveBeenCalledWith(
    `Server connected to ${mockConnectionValue.info?.server_name}`,
  );
});
