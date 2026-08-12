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

export type CreatePlatformRoleMutationVariables = Exact<{
  input: Types.CreatePlatformRoleInput;
}>;


export type CreatePlatformRoleMutation = { createPlatformRole: { id: string | null, key: string | null, name: string | null, description: string | null, isSystem: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type DeletePlatformRoleMutationVariables = Exact<{
  id: string;
}>;


export type DeletePlatformRoleMutation = { deletePlatformRole: string | null };

export type GetPlatformRoleQueryVariables = Exact<{
  id: string;
}>;


export type GetPlatformRoleQuery = { getPlatformRole: { id: string | null, key: string | null, name: string | null, description: string | null, isSystem: boolean | null, createdAt: unknown, updatedAt: unknown, capabilities: Array<{ id: string | null, key: string | null, service: string | null, resource: string | null, action: string | null }> | null } | null };

export type GetPlatformRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlatformRolesQuery = { getPlatformRoles: Array<{ id: string | null, key: string | null, name: string | null, description: string | null, isSystem: boolean | null, createdAt: unknown, updatedAt: unknown }> | null };

export type UpdatePlatformRoleMutationVariables = Exact<{
  input: Types.UpdatePlatformRoleInput;
}>;


export type UpdatePlatformRoleMutation = { updatePlatformRole: { id: string | null, key: string | null, name: string | null, description: string | null, isSystem: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type CreateTenantMutationVariables = Exact<{
  input: Types.CreateTenantInput;
}>;


export type CreateTenantMutation = { createTenant: { id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type DeleteTenantMutationVariables = Exact<{
  id: string;
}>;


export type DeleteTenantMutation = { deleteTenant: string | null };

export type GetTenantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantsQuery = { getTenants: Array<{ id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown }> | null };


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

export const CreatePlatformRoleDocument = new TypedDocumentString(`
    mutation CreatePlatformRole($input: CreatePlatformRoleInput!) {
  createPlatformRole(input: $input) {
    id
    key
    name
    description
    isSystem
    createdAt
    updatedAt
  }
}
    `);

export const useCreatePlatformRoleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePlatformRoleMutation, TError, CreatePlatformRoleMutationVariables, TContext>) => {
    
    return useMutation<CreatePlatformRoleMutation, TError, CreatePlatformRoleMutationVariables, TContext>(
      {
    mutationKey: ['CreatePlatformRole'],
    mutationFn: (variables?: CreatePlatformRoleMutationVariables) => graphQLFetcher<CreatePlatformRoleMutation, CreatePlatformRoleMutationVariables>(CreatePlatformRoleDocument, variables)(),
    ...options
  }
    )};

useCreatePlatformRoleMutation.getKey = () => ['CreatePlatformRole'];

export const DeletePlatformRoleDocument = new TypedDocumentString(`
    mutation DeletePlatformRole($id: String!) {
  deletePlatformRole(id: $id)
}
    `);

export const useDeletePlatformRoleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePlatformRoleMutation, TError, DeletePlatformRoleMutationVariables, TContext>) => {
    
    return useMutation<DeletePlatformRoleMutation, TError, DeletePlatformRoleMutationVariables, TContext>(
      {
    mutationKey: ['DeletePlatformRole'],
    mutationFn: (variables?: DeletePlatformRoleMutationVariables) => graphQLFetcher<DeletePlatformRoleMutation, DeletePlatformRoleMutationVariables>(DeletePlatformRoleDocument, variables)(),
    ...options
  }
    )};

useDeletePlatformRoleMutation.getKey = () => ['DeletePlatformRole'];

export const GetPlatformRoleDocument = new TypedDocumentString(`
    query GetPlatformRole($id: String!) {
  getPlatformRole(id: $id) {
    id
    key
    name
    description
    isSystem
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

export const useGetPlatformRoleQuery = <
      TData = GetPlatformRoleQuery,
      TError = unknown
    >(
      variables: GetPlatformRoleQueryVariables,
      options?: Omit<UseQueryOptions<GetPlatformRoleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPlatformRoleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPlatformRoleQuery, TError, TData>(
      {
    queryKey: ['GetPlatformRole', variables],
    queryFn: graphQLFetcher<GetPlatformRoleQuery, GetPlatformRoleQueryVariables>(GetPlatformRoleDocument, variables),
    ...options
  }
    )};

useGetPlatformRoleQuery.document = GetPlatformRoleDocument;

useGetPlatformRoleQuery.getKey = (variables: GetPlatformRoleQueryVariables) => ['GetPlatformRole', variables];

export const GetPlatformRolesDocument = new TypedDocumentString(`
    query GetPlatformRoles {
  getPlatformRoles {
    id
    key
    name
    description
    isSystem
    createdAt
    updatedAt
  }
}
    `);

export const useGetPlatformRolesQuery = <
      TData = GetPlatformRolesQuery,
      TError = unknown
    >(
      variables?: GetPlatformRolesQueryVariables,
      options?: Omit<UseQueryOptions<GetPlatformRolesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPlatformRolesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPlatformRolesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPlatformRoles'] : ['GetPlatformRoles', variables],
    queryFn: graphQLFetcher<GetPlatformRolesQuery, GetPlatformRolesQueryVariables>(GetPlatformRolesDocument, variables),
    ...options
  }
    )};

useGetPlatformRolesQuery.document = GetPlatformRolesDocument;

useGetPlatformRolesQuery.getKey = (variables?: GetPlatformRolesQueryVariables) => variables === undefined ? ['GetPlatformRoles'] : ['GetPlatformRoles', variables];

export const UpdatePlatformRoleDocument = new TypedDocumentString(`
    mutation UpdatePlatformRole($input: UpdatePlatformRoleInput!) {
  updatePlatformRole(input: $input) {
    id
    key
    name
    description
    isSystem
    createdAt
    updatedAt
  }
}
    `);

export const useUpdatePlatformRoleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdatePlatformRoleMutation, TError, UpdatePlatformRoleMutationVariables, TContext>) => {
    
    return useMutation<UpdatePlatformRoleMutation, TError, UpdatePlatformRoleMutationVariables, TContext>(
      {
    mutationKey: ['UpdatePlatformRole'],
    mutationFn: (variables?: UpdatePlatformRoleMutationVariables) => graphQLFetcher<UpdatePlatformRoleMutation, UpdatePlatformRoleMutationVariables>(UpdatePlatformRoleDocument, variables)(),
    ...options
  }
    )};

useUpdatePlatformRoleMutation.getKey = () => ['UpdatePlatformRole'];

export const CreateTenantDocument = new TypedDocumentString(`
    mutation CreateTenant($input: CreateTenantInput!) {
  createTenant(input: $input) {
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

export const useCreateTenantMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTenantMutation, TError, CreateTenantMutationVariables, TContext>) => {
    
    return useMutation<CreateTenantMutation, TError, CreateTenantMutationVariables, TContext>(
      {
    mutationKey: ['CreateTenant'],
    mutationFn: (variables?: CreateTenantMutationVariables) => graphQLFetcher<CreateTenantMutation, CreateTenantMutationVariables>(CreateTenantDocument, variables)(),
    ...options
  }
    )};

useCreateTenantMutation.getKey = () => ['CreateTenant'];

export const DeleteTenantDocument = new TypedDocumentString(`
    mutation DeleteTenant($id: String!) {
  deleteTenant(id: $id)
}
    `);

export const useDeleteTenantMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteTenantMutation, TError, DeleteTenantMutationVariables, TContext>) => {
    
    return useMutation<DeleteTenantMutation, TError, DeleteTenantMutationVariables, TContext>(
      {
    mutationKey: ['DeleteTenant'],
    mutationFn: (variables?: DeleteTenantMutationVariables) => graphQLFetcher<DeleteTenantMutation, DeleteTenantMutationVariables>(DeleteTenantDocument, variables)(),
    ...options
  }
    )};

useDeleteTenantMutation.getKey = () => ['DeleteTenant'];

export const GetTenantsDocument = new TypedDocumentString(`
    query GetTenants {
  getTenants {
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

export const useGetTenantsQuery = <
      TData = GetTenantsQuery,
      TError = unknown
    >(
      variables?: GetTenantsQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTenants'] : ['GetTenants', variables],
    queryFn: graphQLFetcher<GetTenantsQuery, GetTenantsQueryVariables>(GetTenantsDocument, variables),
    ...options
  }
    )};

useGetTenantsQuery.document = GetTenantsDocument;

useGetTenantsQuery.getKey = (variables?: GetTenantsQueryVariables) => variables === undefined ? ['GetTenants'] : ['GetTenants', variables];
