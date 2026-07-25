/**
 * Payload accepted by a publisher. Transport implementations serialize this
 * (e.g. NATS JSON-encodes objects).
 */
export type MessagePayload = string | object | null;

/**
 * Message publisher contract.
 *
 * Domain code depends only on this interface. Concrete buses provide
 * implementations that are wired at the composition root.
 */
export interface IPublisher {
  send(subject: string, message: MessagePayload): Promise<void>;
}
