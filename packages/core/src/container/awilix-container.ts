import { Logger } from "pino";
import { AwilixContainer as BaseAwilixContainer, Resolver } from "awilix";
import { Container } from "./interfaces/container";

export class AwilixContainer<Services> implements Container<Services> {
  private readonly _logger;
  private readonly _container;
  private readonly _services: { name: string; value: Resolver<unknown> }[] = [];

  constructor(container: BaseAwilixContainer, logger: Logger) {
    this._container = container;
    this._logger = logger;
  }

  /**
   * Add a service to the container.
   * Note: These services are not immediately registered to the container. Call connect method to register services
   * @param name
   * @param value
   */
  add = <T>(name: string, value: T): void => {
    this._services.push({ name, value: value as Resolver<T> });
  };

  /**
   * Register a service to the container
   * @param name - name of the service
   * @param value - class or object value to register
   */
  private register<T>(name: string, value: T): void {
    this._container.register(name, value as Resolver<T>);
  }

  /**
   * Get a registered service by name
   * @param name - name of the service
   */
  get<T extends keyof Services>(name: T): Services[T] {
    return this._container.resolve<Services[T]>(name as string);
  }

  /**
   * Check if a service is already registered to the container
   * @param name
   */
  has(name: string): boolean {
    return this._container.hasRegistration(name);
  }

  /**
   * Register all the added services to the container
   */
  initialize = async () => {
    for (let i = 0; i < this._services.length; i++) {
      const { name, value } = this._services[i];

      this._container.register(name, value);
    }
    this._logger.info("Services registered successfully");
  };

  /**
   * Dispose all the services registered
   */
  dispose(): void {
    this._container.dispose();
  }
}
