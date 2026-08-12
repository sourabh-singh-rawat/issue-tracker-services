export type DocumentTypeDecoration<TResult, TVariables> = {
  __apiType?: (variables: TVariables) => TResult;
};
