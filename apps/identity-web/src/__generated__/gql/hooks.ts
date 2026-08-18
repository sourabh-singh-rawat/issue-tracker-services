/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { graphQLFetcher } from '../../graphql/fetcher';
export { graphQLFetcher };
import type * as Types from './graphql';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
export type UpdateProfileGenderMutationVariables = Exact<{
  input: Types.UpdateProfileGenderInput;
}>;


export type UpdateProfileGenderMutation = { updateProfileGender: { id: string | null, identityId: string | null, gender: Types.ProfileGender | null } | null };

export type UpdateProfileNameMutationVariables = Exact<{
  input: Types.UpdateProfileNameInput;
}>;


export type UpdateProfileNameMutation = { updateProfileName: { id: string | null, identityId: string | null, firstName: string | null, middleName: string | null, lastName: string | null } | null };


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

export const UpdateProfileGenderDocument = new TypedDocumentString(`
    mutation UpdateProfileGender($input: UpdateProfileGenderInput!) {
  updateProfileGender(input: $input) {
    id
    identityId
    gender
  }
}
    `);

export const useUpdateProfileGenderMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProfileGenderMutation, TError, UpdateProfileGenderMutationVariables, TContext>) => {
    
    return useMutation<UpdateProfileGenderMutation, TError, UpdateProfileGenderMutationVariables, TContext>(
      {
    mutationKey: ['UpdateProfileGender'],
    mutationFn: (variables?: UpdateProfileGenderMutationVariables) => graphQLFetcher<UpdateProfileGenderMutation, UpdateProfileGenderMutationVariables>(UpdateProfileGenderDocument, variables)(),
    ...options
  }
    )};

useUpdateProfileGenderMutation.getKey = () => ['UpdateProfileGender'];

export const UpdateProfileNameDocument = new TypedDocumentString(`
    mutation UpdateProfileName($input: UpdateProfileNameInput!) {
  updateProfileName(input: $input) {
    id
    identityId
    firstName
    middleName
    lastName
  }
}
    `);

export const useUpdateProfileNameMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProfileNameMutation, TError, UpdateProfileNameMutationVariables, TContext>) => {
    
    return useMutation<UpdateProfileNameMutation, TError, UpdateProfileNameMutationVariables, TContext>(
      {
    mutationKey: ['UpdateProfileName'],
    mutationFn: (variables?: UpdateProfileNameMutationVariables) => graphQLFetcher<UpdateProfileNameMutation, UpdateProfileNameMutationVariables>(UpdateProfileNameDocument, variables)(),
    ...options
  }
    )};

useUpdateProfileNameMutation.getKey = () => ['UpdateProfileName'];
