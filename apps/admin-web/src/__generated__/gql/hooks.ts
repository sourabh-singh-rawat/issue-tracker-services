/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { graphQLFetcher } from '../../graphql/fetcher';
export { graphQLFetcher };
import type * as Types from './graphql';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
export type GetCapabilitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCapabilitiesQuery = { getCapabilities: Array<{ id: string | null, key: string | null, service: string | null, resource: string | null, action: string | null }> | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: Types.CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { createOrganization: { id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type DeleteOrganizationMutationVariables = Exact<{
  id: string;
}>;


export type DeleteOrganizationMutation = { deleteOrganization: string | null };

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = { getOrganizations: Array<{ id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown }> | null };

export type CreateRoleMutationVariables = Exact<{
  input: Types.CreateRoleInput;
}>;


export type CreateRoleMutation = { createRole: { id: string | null, key: string | null, name: string | null, description: string | null, system: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetRoleQueryVariables = Exact<{
  id: string;
}>;


export type GetRoleQuery = { getRole: { id: string | null, key: string | null, name: string | null, description: string | null, system: boolean | null, createdAt: unknown, updatedAt: unknown, capabilities: Array<{ id: string | null, key: string | null, service: string | null, resource: string | null, action: string | null }> | null } | null };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { getRoles: Array<{ id: string | null, key: string | null, name: string | null, description: string | null, system: boolean | null, createdAt: unknown, updatedAt: unknown }> | null };


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

export const GetCapabilitiesDocument = new TypedDocumentString(`
    query GetCapabilities {
  getCapabilities {
    id
    key
    service
    resource
    action
  }
}
    `);

export const useGetCapabilitiesQuery = <
      TData = GetCapabilitiesQuery,
      TError = unknown
    >(
      variables?: GetCapabilitiesQueryVariables,
      options?: Omit<UseQueryOptions<GetCapabilitiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCapabilitiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCapabilitiesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCapabilities'] : ['GetCapabilities', variables],
    queryFn: graphQLFetcher<GetCapabilitiesQuery, GetCapabilitiesQueryVariables>(GetCapabilitiesDocument, variables),
    ...options
  }
    )};

useGetCapabilitiesQuery.document = GetCapabilitiesDocument;

useGetCapabilitiesQuery.getKey = (variables?: GetCapabilitiesQueryVariables) => variables === undefined ? ['GetCapabilities'] : ['GetCapabilities', variables];

export const CreateOrganizationDocument = new TypedDocumentString(`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    id
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useCreateOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateOrganizationMutation, TError, CreateOrganizationMutationVariables, TContext>) => {
    
    return useMutation<CreateOrganizationMutation, TError, CreateOrganizationMutationVariables, TContext>(
      {
    mutationKey: ['CreateOrganization'],
    mutationFn: (variables?: CreateOrganizationMutationVariables) => graphQLFetcher<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, variables)(),
    ...options
  }
    )};

useCreateOrganizationMutation.getKey = () => ['CreateOrganization'];

export const DeleteOrganizationDocument = new TypedDocumentString(`
    mutation DeleteOrganization($id: String!) {
  deleteOrganization(id: $id)
}
    `);

export const useDeleteOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteOrganizationMutation, TError, DeleteOrganizationMutationVariables, TContext>) => {
    
    return useMutation<DeleteOrganizationMutation, TError, DeleteOrganizationMutationVariables, TContext>(
      {
    mutationKey: ['DeleteOrganization'],
    mutationFn: (variables?: DeleteOrganizationMutationVariables) => graphQLFetcher<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(DeleteOrganizationDocument, variables)(),
    ...options
  }
    )};

useDeleteOrganizationMutation.getKey = () => ['DeleteOrganization'];

export const GetOrganizationsDocument = new TypedDocumentString(`
    query GetOrganizations {
  getOrganizations {
    id
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useGetOrganizationsQuery = <
      TData = GetOrganizationsQuery,
      TError = unknown
    >(
      variables?: GetOrganizationsQueryVariables,
      options?: Omit<UseQueryOptions<GetOrganizationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetOrganizationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetOrganizationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetOrganizations'] : ['GetOrganizations', variables],
    queryFn: graphQLFetcher<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, variables),
    ...options
  }
    )};

useGetOrganizationsQuery.document = GetOrganizationsDocument;

useGetOrganizationsQuery.getKey = (variables?: GetOrganizationsQueryVariables) => variables === undefined ? ['GetOrganizations'] : ['GetOrganizations', variables];

export const CreateRoleDocument = new TypedDocumentString(`
    mutation CreateRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    id
    key
    name
    description
    system
    createdAt
    updatedAt
  }
}
    `);

export const useCreateRoleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateRoleMutation, TError, CreateRoleMutationVariables, TContext>) => {
    
    return useMutation<CreateRoleMutation, TError, CreateRoleMutationVariables, TContext>(
      {
    mutationKey: ['CreateRole'],
    mutationFn: (variables?: CreateRoleMutationVariables) => graphQLFetcher<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, variables)(),
    ...options
  }
    )};

useCreateRoleMutation.getKey = () => ['CreateRole'];

export const GetRoleDocument = new TypedDocumentString(`
    query GetRole($id: String!) {
  getRole(id: $id) {
    id
    key
    name
    description
    system
    createdAt
    updatedAt
    capabilities {
      id
      key
      service
      resource
      action
    }
  }
}
    `);

export const useGetRoleQuery = <
      TData = GetRoleQuery,
      TError = unknown
    >(
      variables: GetRoleQueryVariables,
      options?: Omit<UseQueryOptions<GetRoleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetRoleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetRoleQuery, TError, TData>(
      {
    queryKey: ['GetRole', variables],
    queryFn: graphQLFetcher<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, variables),
    ...options
  }
    )};

useGetRoleQuery.document = GetRoleDocument;

useGetRoleQuery.getKey = (variables: GetRoleQueryVariables) => ['GetRole', variables];

export const GetRolesDocument = new TypedDocumentString(`
    query GetRoles {
  getRoles {
    id
    key
    name
    description
    system
    createdAt
    updatedAt
  }
}
    `);

export const useGetRolesQuery = <
      TData = GetRolesQuery,
      TError = unknown
    >(
      variables?: GetRolesQueryVariables,
      options?: Omit<UseQueryOptions<GetRolesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetRolesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetRolesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetRoles'] : ['GetRoles', variables],
    queryFn: graphQLFetcher<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, variables),
    ...options
  }
    )};

useGetRolesQuery.document = GetRolesDocument;

useGetRolesQuery.getKey = (variables?: GetRolesQueryVariables) => variables === undefined ? ['GetRoles'] : ['GetRoles', variables];
