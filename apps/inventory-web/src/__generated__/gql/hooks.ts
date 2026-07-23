/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { graphQLFetcher } from '../../graphql/fetcher';
import type * as Types from './graphql';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { hello: { message2: string | null } | null };

export type RegisterUserWithEmailAndPasswordMutationVariables = Exact<{
  input: Types.RegisterUserInput;
}>;


export type RegisterUserWithEmailAndPasswordMutation = { registerUserWithEmailAndPassword: string | null };


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const HelloWorldDocument = new TypedDocumentString(`
    query HelloWorld {
  hello {
    message2
  }
}
    `);

export const useHelloWorldQuery = <
      TData = HelloWorldQuery,
      TError = unknown
    >(
      variables?: HelloWorldQueryVariables,
      options?: Omit<UseQueryOptions<HelloWorldQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<HelloWorldQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<HelloWorldQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['HelloWorld'] : ['HelloWorld', variables],
    queryFn: graphQLFetcher<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, variables),
    ...options
  }
    )};

useHelloWorldQuery.document = HelloWorldDocument;

useHelloWorldQuery.getKey = (variables?: HelloWorldQueryVariables) => variables === undefined ? ['HelloWorld'] : ['HelloWorld', variables];

export const RegisterUserWithEmailAndPasswordDocument = new TypedDocumentString(`
    mutation RegisterUserWithEmailAndPassword($input: RegisterUserInput!) {
  registerUserWithEmailAndPassword(input: $input)
}
    `);

export const useRegisterUserWithEmailAndPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterUserWithEmailAndPasswordMutation, TError, RegisterUserWithEmailAndPasswordMutationVariables, TContext>) => {
    
    return useMutation<RegisterUserWithEmailAndPasswordMutation, TError, RegisterUserWithEmailAndPasswordMutationVariables, TContext>(
      {
    mutationKey: ['RegisterUserWithEmailAndPassword'],
    mutationFn: (variables?: RegisterUserWithEmailAndPasswordMutationVariables) => graphQLFetcher<RegisterUserWithEmailAndPasswordMutation, RegisterUserWithEmailAndPasswordMutationVariables>(RegisterUserWithEmailAndPasswordDocument, variables)(),
    ...options
  }
    )};

useRegisterUserWithEmailAndPasswordMutation.getKey = () => ['RegisterUserWithEmailAndPassword'];
