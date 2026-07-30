export interface IOutboxPublisher {
  send(event: Record<string, unknown>): Promise<void>;
}
