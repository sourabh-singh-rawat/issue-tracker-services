export interface Container<Services> {
  get<T extends keyof Services>(name: T): Services[T];
  has(name: string): boolean;
  dispose(): void;
  initialize(): Promise<void>;
}
