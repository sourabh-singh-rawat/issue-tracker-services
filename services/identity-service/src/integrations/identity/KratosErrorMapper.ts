import { injectable } from "inversify";
import {
  IdentityAlreadyExistsError,
  IdentityNotFoundError,
  IdentityProviderUnavailableError,
  InvalidCredentialError,
} from "@/integrations/identity/errors";

@injectable()
export class KratosErrorMapper {
  private static readonly ALREADY_EXISTS_ERROR_ID = 4000007;

  rethrow(error: unknown): never {
    const status = this.getHttpStatus(error);

    if (status === 400 && this.isAlreadyExistsError(error)) {
      throw new IdentityAlreadyExistsError();
    }

    switch (status) {
      case 400:
      case 401:
      case 403:
        throw new InvalidCredentialError();
      case 404:
        throw new IdentityNotFoundError();
      case 409:
        throw new IdentityAlreadyExistsError();
      default:
        if (status === undefined || status >= 500) {
          throw new IdentityProviderUnavailableError();
        }
        throw error;
    }
  }

  getHttpStatus(error: unknown): number | undefined {
    if (typeof error !== "object" || error === null || !("response" in error)) {
      return undefined;
    }
    return (error as { response?: { status?: number } }).response?.status;
  }

  isAlreadyExistsError(error: unknown): boolean {
    if (typeof error !== "object" || error === null || !("response" in error)) {
      return false;
    }
    const data = (error as { response?: { data?: unknown } }).response?.data;
    if (typeof data !== "object" || data === null) {
      return false;
    }

    const collectMessages = (value: unknown): unknown[] => {
      if (typeof value !== "object" || value === null) {
        return [];
      }
      const messages = (value as { messages?: unknown }).messages;
      return Array.isArray(messages) ? messages : [];
    };

    const ui = (data as { ui?: unknown }).ui;
    const topLevel = collectMessages(data);
    const uiMessages = collectMessages(ui);
    const nodeMessages: unknown[] = [];
    if (typeof ui === "object" && ui !== null) {
      const nodes = (ui as { nodes?: unknown }).nodes;
      if (Array.isArray(nodes)) {
        for (const node of nodes) {
          nodeMessages.push(...collectMessages(node));
        }
      }
    }

    return [...topLevel, ...uiMessages, ...nodeMessages].some((message) => {
      if (typeof message !== "object" || message === null) {
        return false;
      }
      const id = (message as { id?: unknown }).id;
      if (id === KratosErrorMapper.ALREADY_EXISTS_ERROR_ID) {
        return true;
      }
      const text = (message as { text?: unknown }).text;
      return typeof text === "string" && /already exists/i.test(text);
    });
  }
}
