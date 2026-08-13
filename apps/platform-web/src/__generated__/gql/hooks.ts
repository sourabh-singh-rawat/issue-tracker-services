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


export type CreateOrganizationMutation = { createOrganization: { id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetOrganizationQueryVariables = Exact<{
  id: string;
}>;


export type GetOrganizationQuery = { getOrganization: { id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetOrganizationRolesQueryVariables = Exact<{
  organizationId: string;
}>;


export type GetOrganizationRolesQuery = { getOrganizationRoles: Array<{ id: string | null, organizationId: string | null, key: string | null, name: string | null, description: string | null, isSystem: boolean | null, createdAt: unknown, updatedAt: unknown, capabilities: Array<{ id: string | null, key: string | null, service: string | null, resource: string | null, action: string | null }> | null }> | null };

export type GetOrganizationsQueryVariables = Exact<{
  tenantId: string;
  parentOrganizationId?: string | null | undefined;
}>;


export type GetOrganizationsQuery = { getOrganizations: Array<{ id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown }> | null };

export type UpdateOrganizationMutationVariables = Exact<{
  id: string;
  input: Types.UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { updateOrganization: { id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

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

export type GetTenantQueryVariables = Exact<{
  id: string;
}>;


export type GetTenantQuery = { getTenant: { id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetTenantMembersQueryVariables = Exact<{
  tenantId?: string | null | undefined;
}>;


export type GetTenantMembersQuery = { getTenantMembers: Array<{ id: string | null, tenantId: string | null, roleId: string | null, identityId: string | null, assignedBy: string | null, assignedAt: unknown, expiresAt: unknown, reason: string | null, createdAt: unknown, updatedAt: unknown, tenantRole: { id: string | null, key: string | null, name: string | null, isSystem: boolean | null } | null }> | null };

export type GetTenantRolesQueryVariables = Exact<{
  tenantId: string;
}>;


export type GetTenantRolesQuery = { getTenantRoles: Array<{ id: string | null, tenantId: string | null, key: string | null, name: string | null, description: string | null, isSystem: boolean | null, createdAt: unknown, updatedAt: unknown, capabilities: Array<{ id: string | null, key: string | null, service: string | null, resource: string | null, action: string | null }> | null }> | null };

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

export const CreateOrganizationDocument = new TypedDocumentString(`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    id
    tenantId
    parentOrganizationId
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

export const GetOrganizationDocument = new TypedDocumentString(`
    query GetOrganization($id: String!) {
  getOrganization(id: $id) {
    id
    tenantId
    parentOrganizationId
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useGetOrganizationQuery = <
      TData = GetOrganizationQuery,
      TError = unknown
    >(
      variables: GetOrganizationQueryVariables,
      options?: Omit<UseQueryOptions<GetOrganizationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetOrganizationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetOrganizationQuery, TError, TData>(
      {
    queryKey: ['GetOrganization', variables],
    queryFn: graphQLFetcher<GetOrganizationQuery, GetOrganizationQueryVariables>(GetOrganizationDocument, variables),
    ...options
  }
    )};

useGetOrganizationQuery.document = GetOrganizationDocument;

useGetOrganizationQuery.getKey = (variables: GetOrganizationQueryVariables) => ['GetOrganization', variables];

export const GetOrganizationRolesDocument = new TypedDocumentString(`
    query GetOrganizationRoles($organizationId: String!) {
  getOrganizationRoles(organizationId: $organizationId) {
    id
    organizationId
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

export const useGetOrganizationRolesQuery = <
      TData = GetOrganizationRolesQuery,
      TError = unknown
    >(
      variables: GetOrganizationRolesQueryVariables,
      options?: Omit<UseQueryOptions<GetOrganizationRolesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetOrganizationRolesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetOrganizationRolesQuery, TError, TData>(
      {
    queryKey: ['GetOrganizationRoles', variables],
    queryFn: graphQLFetcher<GetOrganizationRolesQuery, GetOrganizationRolesQueryVariables>(GetOrganizationRolesDocument, variables),
    ...options
  }
    )};

useGetOrganizationRolesQuery.document = GetOrganizationRolesDocument;

useGetOrganizationRolesQuery.getKey = (variables: GetOrganizationRolesQueryVariables) => ['GetOrganizationRoles', variables];

export const GetOrganizationsDocument = new TypedDocumentString(`
    query GetOrganizations($tenantId: String!, $parentOrganizationId: String) {
  getOrganizations(
    tenantId: $tenantId
    parentOrganizationId: $parentOrganizationId
  ) {
    id
    tenantId
    parentOrganizationId
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
      variables: GetOrganizationsQueryVariables,
      options?: Omit<UseQueryOptions<GetOrganizationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetOrganizationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetOrganizationsQuery, TError, TData>(
      {
    queryKey: ['GetOrganizations', variables],
    queryFn: graphQLFetcher<GetOrganizationsQuery, GetOrganizationsQueryVariables>(GetOrganizationsDocument, variables),
    ...options
  }
    )};

useGetOrganizationsQuery.document = GetOrganizationsDocument;

useGetOrganizationsQuery.getKey = (variables: GetOrganizationsQueryVariables) => ['GetOrganizations', variables];

export const UpdateOrganizationDocument = new TypedDocumentString(`
    mutation UpdateOrganization($id: String!, $input: UpdateOrganizationInput!) {
  updateOrganization(id: $id, input: $input) {
    id
    tenantId
    parentOrganizationId
    name
    slug
    description
    isActive
    createdAt
    updatedAt
  }
}
    `);

export const useUpdateOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateOrganizationMutation, TError, UpdateOrganizationMutationVariables, TContext>) => {
    
    return useMutation<UpdateOrganizationMutation, TError, UpdateOrganizationMutationVariables, TContext>(
      {
    mutationKey: ['UpdateOrganization'],
    mutationFn: (variables?: UpdateOrganizationMutationVariables) => graphQLFetcher<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, variables)(),
    ...options
  }
    )};

useUpdateOrganizationMutation.getKey = () => ['UpdateOrganization'];

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

export const GetTenantDocument = new TypedDocumentString(`
    query GetTenant($id: String!) {
  getTenant(id: $id) {
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

export const useGetTenantQuery = <
      TData = GetTenantQuery,
      TError = unknown
    >(
      variables: GetTenantQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantQuery, TError, TData>(
      {
    queryKey: ['GetTenant', variables],
    queryFn: graphQLFetcher<GetTenantQuery, GetTenantQueryVariables>(GetTenantDocument, variables),
    ...options
  }
    )};

useGetTenantQuery.document = GetTenantDocument;

useGetTenantQuery.getKey = (variables: GetTenantQueryVariables) => ['GetTenant', variables];

export const GetTenantMembersDocument = new TypedDocumentString(`
    query GetTenantMembers($tenantId: String) {
  getTenantMembers(tenantId: $tenantId) {
    id
    tenantId
    roleId
    identityId
    assignedBy
    assignedAt
    expiresAt
    reason
    createdAt
    updatedAt
    tenantRole {
      id
      key
      name
      isSystem
    }
  }
}
    `);

export const useGetTenantMembersQuery = <
      TData = GetTenantMembersQuery,
      TError = unknown
    >(
      variables?: GetTenantMembersQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantMembersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantMembersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantMembersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetTenantMembers'] : ['GetTenantMembers', variables],
    queryFn: graphQLFetcher<GetTenantMembersQuery, GetTenantMembersQueryVariables>(GetTenantMembersDocument, variables),
    ...options
  }
    )};

useGetTenantMembersQuery.document = GetTenantMembersDocument;

useGetTenantMembersQuery.getKey = (variables?: GetTenantMembersQueryVariables) => variables === undefined ? ['GetTenantMembers'] : ['GetTenantMembers', variables];

export const GetTenantRolesDocument = new TypedDocumentString(`
    query GetTenantRoles($tenantId: String!) {
  getTenantRoles(tenantId: $tenantId) {
    id
    tenantId
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

export const useGetTenantRolesQuery = <
      TData = GetTenantRolesQuery,
      TError = unknown
    >(
      variables: GetTenantRolesQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantRolesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantRolesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantRolesQuery, TError, TData>(
      {
    queryKey: ['GetTenantRoles', variables],
    queryFn: graphQLFetcher<GetTenantRolesQuery, GetTenantRolesQueryVariables>(GetTenantRolesDocument, variables),
    ...options
  }
    )};

useGetTenantRolesQuery.document = GetTenantRolesDocument;

useGetTenantRolesQuery.getKey = (variables: GetTenantRolesQueryVariables) => ['GetTenantRoles', variables];

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
