export interface ICommand<TInput, TResult> {
  execute: (input: TInput) => Promise<TResult>;
}
