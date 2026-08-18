/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { graphQLFetcher } from '../../graphql/fetcher';
export { graphQLFetcher };
import type * as Types from './graphql';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
export type FindIdentitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindIdentitiesQuery = { findIdentities: Array<{ id: string | null }> | null };

export type GetIdentitiesQueryVariables = Exact<{
  platformId: string;
}>;


export type GetIdentitiesQuery = { getIdentities: Array<{ id: string | null, displayName: string | null }> | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: Types.CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { createOrganization: { id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetOrganizationQueryVariables = Exact<{
  id: string;
}>;


export type GetOrganizationQuery = { getOrganization: { id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetOrganizationMembersQueryVariables = Exact<{
  organizationId: string;
}>;


export type GetOrganizationMembersQuery = { getOrganizationMembers: Array<{ id: string | null, organizationId: string | null, identityId: string | null, relation: string | null }> | null };

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

export type CreatePlatformRelationMutationVariables = Exact<{
  input: Types.CreatePlatformRelationInput;
}>;


export type CreatePlatformRelationMutation = { createPlatformRelation: { id: string | null, identityId: string | null, relation: string | null } | null };

export type DeletePlatformRelationMutationVariables = Exact<{
  id: string;
}>;


export type DeletePlatformRelationMutation = { deletePlatformRelation: string | null };

export type GetPlatformRelationsQueryVariables = Exact<{
  relation?: string | null | undefined;
  identityId?: string | null | undefined;
}>;


export type GetPlatformRelationsQuery = { getPlatformRelations: Array<{ id: string | null, identityId: string | null, relation: string | null }> | null };

export type CreateTenantMutationVariables = Exact<{
  input: Types.CreateTenantInput;
}>;


export type CreateTenantMutation = { createTenant: { id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type CreateTenantRelationMutationVariables = Exact<{
  input: Types.CreateTenantRelationInput;
}>;


export type CreateTenantRelationMutation = { createTenantRelation: { id: string | null, tenantId: string | null, identityId: string | null, relation: string | null } | null };

export type DeleteTenantMutationVariables = Exact<{
  id: string;
  platformId: string;
}>;


export type DeleteTenantMutation = { deleteTenant: string | null };

export type GetTenantQueryVariables = Exact<{
  id: string;
}>;


export type GetTenantQuery = { getTenant: { id: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, updatedAt: unknown } | null };

export type GetTenantRelationsQueryVariables = Exact<{
  tenantId: string;
}>;


export type GetTenantRelationsQuery = { getTenantRelations: Array<{ id: string | null, tenantId: string | null, identityId: string | null, relation: string | null }> | null };

export type GetTenantsQueryVariables = Exact<{
  platformId: string;
}>;


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

export const FindIdentitiesDocument = new TypedDocumentString(`
    query FindIdentities {
  findIdentities {
    id
  }
}
    `);

export const useFindIdentitiesQuery = <
      TData = FindIdentitiesQuery,
      TError = unknown
    >(
      variables?: FindIdentitiesQueryVariables,
      options?: Omit<UseQueryOptions<FindIdentitiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindIdentitiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindIdentitiesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindIdentities'] : ['FindIdentities', variables],
    queryFn: graphQLFetcher<FindIdentitiesQuery, FindIdentitiesQueryVariables>(FindIdentitiesDocument, variables),
    ...options
  }
    )};

useFindIdentitiesQuery.document = FindIdentitiesDocument;

useFindIdentitiesQuery.getKey = (variables?: FindIdentitiesQueryVariables) => variables === undefined ? ['FindIdentities'] : ['FindIdentities', variables];

export const GetIdentitiesDocument = new TypedDocumentString(`
    query GetIdentities($platformId: String!) {
  getIdentities(platformId: $platformId) {
    id
    displayName
  }
}
    `);

export const useGetIdentitiesQuery = <
      TData = GetIdentitiesQuery,
      TError = unknown
    >(
      variables: GetIdentitiesQueryVariables,
      options?: Omit<UseQueryOptions<GetIdentitiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetIdentitiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetIdentitiesQuery, TError, TData>(
      {
    queryKey: ['GetIdentities', variables],
    queryFn: graphQLFetcher<GetIdentitiesQuery, GetIdentitiesQueryVariables>(GetIdentitiesDocument, variables),
    ...options
  }
    )};

useGetIdentitiesQuery.document = GetIdentitiesDocument;

useGetIdentitiesQuery.getKey = (variables: GetIdentitiesQueryVariables) => ['GetIdentities', variables];

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

export const GetOrganizationMembersDocument = new TypedDocumentString(`
    query GetOrganizationMembers($organizationId: String!) {
  getOrganizationMembers(organizationId: $organizationId) {
    id
    organizationId
    identityId
    relation
  }
}
    `);

export const useGetOrganizationMembersQuery = <
      TData = GetOrganizationMembersQuery,
      TError = unknown
    >(
      variables: GetOrganizationMembersQueryVariables,
      options?: Omit<UseQueryOptions<GetOrganizationMembersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetOrganizationMembersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetOrganizationMembersQuery, TError, TData>(
      {
    queryKey: ['GetOrganizationMembers', variables],
    queryFn: graphQLFetcher<GetOrganizationMembersQuery, GetOrganizationMembersQueryVariables>(GetOrganizationMembersDocument, variables),
    ...options
  }
    )};

useGetOrganizationMembersQuery.document = GetOrganizationMembersDocument;

useGetOrganizationMembersQuery.getKey = (variables: GetOrganizationMembersQueryVariables) => ['GetOrganizationMembers', variables];

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

export const CreatePlatformRelationDocument = new TypedDocumentString(`
    mutation CreatePlatformRelation($input: CreatePlatformRelationInput!) {
  createPlatformRelation(input: $input) {
    id
    identityId
    relation
  }
}
    `);

export const useCreatePlatformRelationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePlatformRelationMutation, TError, CreatePlatformRelationMutationVariables, TContext>) => {
    
    return useMutation<CreatePlatformRelationMutation, TError, CreatePlatformRelationMutationVariables, TContext>(
      {
    mutationKey: ['CreatePlatformRelation'],
    mutationFn: (variables?: CreatePlatformRelationMutationVariables) => graphQLFetcher<CreatePlatformRelationMutation, CreatePlatformRelationMutationVariables>(CreatePlatformRelationDocument, variables)(),
    ...options
  }
    )};

useCreatePlatformRelationMutation.getKey = () => ['CreatePlatformRelation'];

export const DeletePlatformRelationDocument = new TypedDocumentString(`
    mutation DeletePlatformRelation($id: String!) {
  deletePlatformRelation(id: $id)
}
    `);

export const useDeletePlatformRelationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePlatformRelationMutation, TError, DeletePlatformRelationMutationVariables, TContext>) => {
    
    return useMutation<DeletePlatformRelationMutation, TError, DeletePlatformRelationMutationVariables, TContext>(
      {
    mutationKey: ['DeletePlatformRelation'],
    mutationFn: (variables?: DeletePlatformRelationMutationVariables) => graphQLFetcher<DeletePlatformRelationMutation, DeletePlatformRelationMutationVariables>(DeletePlatformRelationDocument, variables)(),
    ...options
  }
    )};

useDeletePlatformRelationMutation.getKey = () => ['DeletePlatformRelation'];

export const GetPlatformRelationsDocument = new TypedDocumentString(`
    query GetPlatformRelations($relation: String, $identityId: String) {
  getPlatformRelations(relation: $relation, identityId: $identityId) {
    id
    identityId
    relation
  }
}
    `);

export const useGetPlatformRelationsQuery = <
      TData = GetPlatformRelationsQuery,
      TError = unknown
    >(
      variables?: GetPlatformRelationsQueryVariables,
      options?: Omit<UseQueryOptions<GetPlatformRelationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPlatformRelationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPlatformRelationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPlatformRelations'] : ['GetPlatformRelations', variables],
    queryFn: graphQLFetcher<GetPlatformRelationsQuery, GetPlatformRelationsQueryVariables>(GetPlatformRelationsDocument, variables),
    ...options
  }
    )};

useGetPlatformRelationsQuery.document = GetPlatformRelationsDocument;

useGetPlatformRelationsQuery.getKey = (variables?: GetPlatformRelationsQueryVariables) => variables === undefined ? ['GetPlatformRelations'] : ['GetPlatformRelations', variables];

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

export const CreateTenantRelationDocument = new TypedDocumentString(`
    mutation CreateTenantRelation($input: CreateTenantRelationInput!) {
  createTenantRelation(input: $input) {
    id
    tenantId
    identityId
    relation
  }
}
    `);

export const useCreateTenantRelationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTenantRelationMutation, TError, CreateTenantRelationMutationVariables, TContext>) => {
    
    return useMutation<CreateTenantRelationMutation, TError, CreateTenantRelationMutationVariables, TContext>(
      {
    mutationKey: ['CreateTenantRelation'],
    mutationFn: (variables?: CreateTenantRelationMutationVariables) => graphQLFetcher<CreateTenantRelationMutation, CreateTenantRelationMutationVariables>(CreateTenantRelationDocument, variables)(),
    ...options
  }
    )};

useCreateTenantRelationMutation.getKey = () => ['CreateTenantRelation'];

export const DeleteTenantDocument = new TypedDocumentString(`
    mutation DeleteTenant($id: String!, $platformId: String!) {
  deleteTenant(id: $id, platformId: $platformId)
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

export const GetTenantRelationsDocument = new TypedDocumentString(`
    query GetTenantRelations($tenantId: String!) {
  getTenantRelations(tenantId: $tenantId) {
    id
    tenantId
    identityId
    relation
  }
}
    `);

export const useGetTenantRelationsQuery = <
      TData = GetTenantRelationsQuery,
      TError = unknown
    >(
      variables: GetTenantRelationsQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantRelationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantRelationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantRelationsQuery, TError, TData>(
      {
    queryKey: ['GetTenantRelations', variables],
    queryFn: graphQLFetcher<GetTenantRelationsQuery, GetTenantRelationsQueryVariables>(GetTenantRelationsDocument, variables),
    ...options
  }
    )};

useGetTenantRelationsQuery.document = GetTenantRelationsDocument;

useGetTenantRelationsQuery.getKey = (variables: GetTenantRelationsQueryVariables) => ['GetTenantRelations', variables];

export const GetTenantsDocument = new TypedDocumentString(`
    query GetTenants($platformId: String!) {
  getTenants(platformId: $platformId) {
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
      variables: GetTenantsQueryVariables,
      options?: Omit<UseQueryOptions<GetTenantsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetTenantsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetTenantsQuery, TError, TData>(
      {
    queryKey: ['GetTenants', variables],
    queryFn: graphQLFetcher<GetTenantsQuery, GetTenantsQueryVariables>(GetTenantsDocument, variables),
    ...options
  }
    )};

useGetTenantsQuery.document = GetTenantsDocument;

useGetTenantsQuery.getKey = (variables: GetTenantsQueryVariables) => ['GetTenants', variables];
