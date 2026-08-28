/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { graphQLFetcher } from '../../graphql/fetcher';
export { graphQLFetcher };
import type * as Types from './graphql';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
export type CreatePhotoUploadRequestMutationVariables = Exact<{
  input: Types.CreatePhotoUploadRequestInput;
}>;


export type CreatePhotoUploadRequestMutation = { createPhotoUploadRequest: { uploadRequestId: string | null, url: string | null, expiresAt: string | null, headers: Array<{ key: string | null, value: string | null }> | null } | null };

export type UpdateProfileGenderMutationVariables = Exact<{
  input: Types.UpdateProfileGenderInput;
}>;


export type UpdateProfileGenderMutation = { updateProfileGender: { id: string | null, identityId: string | null, gender: Types.ProfileGender | null } | null };

export type UpdateProfileNameMutationVariables = Exact<{
  input: Types.UpdateProfileNameInput;
}>;


export type UpdateProfileNameMutation = { updateProfileName: { id: string | null, identityId: string | null, firstName: string | null, middleName: string | null, lastName: string | null } | null };

export type GetMyTenantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTenantsQuery = { getMyTenants: Array<{ id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown }> | null };


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

export const CreatePhotoUploadRequestDocument = new TypedDocumentString(`
    mutation CreatePhotoUploadRequest($input: CreatePhotoUploadRequestInput!) {
  createPhotoUploadRequest(input: $input) {
    uploadRequestId
    url
    expiresAt
    headers {
      key
      value
    }
  }
}
    `);

export const useCreatePhotoUploadRequestMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePhotoUploadRequestMutation, TError, CreatePhotoUploadRequestMutationVariables, TContext>) => {
    
    return useMutation<CreatePhotoUploadRequestMutation, TError, CreatePhotoUploadRequestMutationVariables, TContext>(
      {
    mutationKey: ['CreatePhotoUploadRequest'],
    mutationFn: (variables?: CreatePhotoUploadRequestMutationVariables) => graphQLFetcher<CreatePhotoUploadRequestMutation, CreatePhotoUploadRequestMutationVariables>(CreatePhotoUploadRequestDocument, variables)(),
    ...options
  }
    )};

useCreatePhotoUploadRequestMutation.getKey = () => ['CreatePhotoUploadRequest'];

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

export const GetMyTenantsDocument = new TypedDocumentString(`
    query GetMyTenants {
  getMyTenants {
    id
    name
    slug
    description
    isActive
    createdAt
  }
}
    `);

export const useGetMyTenantsQuery = <
      TData = GetMyTenantsQuery,
      TError = unknown
    >(
      variables?: GetMyTenantsQueryVariables,
      options?: Omit<UseQueryOptions<GetMyTenantsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMyTenantsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMyTenantsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetMyTenants'] : ['GetMyTenants', variables],
    queryFn: graphQLFetcher<GetMyTenantsQuery, GetMyTenantsQueryVariables>(GetMyTenantsDocument, variables),
    ...options
  }
    )};

useGetMyTenantsQuery.document = GetMyTenantsDocument;

useGetMyTenantsQuery.getKey = (variables?: GetMyTenantsQueryVariables) => variables === undefined ? ['GetMyTenants'] : ['GetMyTenants', variables];
