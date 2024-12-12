export interface Di<Services> {
  get<T extends keyof Services>(name: T): Services[T];
  has(name: string): boolean;
  dispose(): void;
  init(): void;
}
