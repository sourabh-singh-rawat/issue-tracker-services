import { AwilixContainer, Resolver } from "awilix";
import { Di } from "./interfaces/di.interface";
import { AppLogger } from "../logger";

export class AwilixDi<Services> implements Di<Services> {
  private readonly logger;
  private readonly di;
  private readonly services: { name: string; value: Resolver<unknown> }[] = [];

  constructor(di: AwilixContainer, logger: AppLogger) {
    this.di = di;
    this.logger = logger;
  }

  /**
   * Add a service to the container.
   * Note: These services are not immediately registered to the container. Call connect method to register services
   * @param name
   * @param value
   */
  add = <T>(name: string, value: T): void => {
    this.services.push({ name, value: value as Resolver<T> });
  };

  /**
   * Get a registered service by name
   * @param name - name of the service
   */
  get<T extends keyof Services>(name: T): Services[T] {
    return this.di.resolve<Services[T]>(name as string);
  }

  /**
   * Check if a service is already registered to the container
   * @param name
   */
  has(name: string): boolean {
    return this.di.hasRegistration(name);
  }

  /**
   * Register all the added services to the container
   */
  init = () => {
    for (let i = 0; i < this.services.length; i++) {
      const { name, value } = this.services[i];

      this.di.register(name, value);
    }
    this.logger.info("Services registered successfully");
  };

  /**
   * Dispose all the services registered
   */
  dispose(): void {
    this.di.dispose();
  }
}
