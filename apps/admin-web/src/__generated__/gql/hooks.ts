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

export type UpdateRoleMutationVariables = Exact<{
  input: Types.UpdateRoleInput;
}>;


export type UpdateRoleMutation = { updateRole: { id: string | null, key: string | null, name: string | null, description: string | null, system: boolean | null, createdAt: unknown, updatedAt: unknown, capabilities: Array<{ id: string | null, key: string | null, service: string | null, resource: string | null, action: string | null }> | null } | null };

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

export const UpdateRoleDocument = new TypedDocumentString(`
    mutation UpdateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
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

export const useUpdateRoleMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateRoleMutation, TError, UpdateRoleMutationVariables, TContext>) => {
    
    return useMutation<UpdateRoleMutation, TError, UpdateRoleMutationVariables, TContext>(
      {
    mutationKey: ['UpdateRole'],
    mutationFn: (variables?: UpdateRoleMutationVariables) => graphQLFetcher<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, variables)(),
    ...options
  }
    )};

useUpdateRoleMutation.getKey = () => ['UpdateRole'];

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
