/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { graphQLFetcher } from '../../graphql/fetcher';
export { graphQLFetcher };
import type * as Types from './graphql';

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
export type DeleteAttachmentMutationVariables = Exact<{
  deleteAttachmentId: string;
}>;


export type DeleteAttachmentMutation = { deleteAttachment: string | null };

export type CreateIssueMutationVariables = Exact<{
  input: Types.CreateIssueInput;
}>;


export type CreateIssueMutation = { createIssue: string | null };

export type FindIssueQueryVariables = Exact<{
  findIssueId: string;
}>;


export type FindIssueQuery = { findIssue: { id: string | null, description: string | null, name: string | null, statusId: string | null, priority: string | null, project: { id: string | null, name: string | null } | null, parentIssue: { id: string | null, name: string | null } | null } | null };

export type FindProjectIssuesQueryVariables = Exact<{
  projectId: string;
}>;


export type FindProjectIssuesQuery = { findProjectIssues: Array<{ description: string | null, id: string | null, name: string | null, statusId: string | null, priority: string | null }> | null };

export type FindSubIssuesQueryVariables = Exact<{
  input: Types.FindIssuesInput;
}>;


export type FindSubIssuesQuery = { findSubIssues: Array<{ description: string | null, id: string | null, name: string | null }> | null };

export type UpdateIssueMutationVariables = Exact<{
  input: Types.UpdateIssueInput;
}>;


export type UpdateIssueMutation = { updateIssue: string | null };

export type GetMyOrganizationPreferenceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOrganizationPreferenceQuery = { getMyOrganizationPreference: { organizationId: string | null, tenantId: string | null, updatedAt: unknown } | null };

export type GetMyOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOrganizationsQuery = { getMyOrganizations: Array<{ id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, children: Array<{ id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, children: Array<{ id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, children: Array<{ id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, children: Array<{ id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown, children: Array<{ id: string | null, tenantId: string | null, parentOrganizationId: string | null, name: string | null, slug: string | null, description: string | null, isActive: boolean | null, createdAt: unknown }> | null }> | null }> | null }> | null }> | null }> | null };

export type SetMyOrganizationPreferenceMutationVariables = Exact<{
  organizationId: string;
}>;


export type SetMyOrganizationPreferenceMutation = { setMyOrganizationPreference: { organizationId: string | null, tenantId: string | null, updatedAt: unknown } | null };

export type CreateProjectMutationVariables = Exact<{
  input: Types.CreateProjectInput;
}>;


export type CreateProjectMutation = { createProject: string | null };

export type FindProjectQueryVariables = Exact<{
  findProjectId: string;
}>;


export type FindProjectQuery = { findProject: { id: string | null, name: string | null } | null };

export type FindProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProjectsQuery = { findProjects: { rowCount: number | null, rows: Array<{ id: string | null, name: string | null }> | null } | null };

export type FindStatusesQueryVariables = Exact<{
  input: Types.FindStatusesOptions;
}>;


export type FindStatusesQuery = { findStatuses: Array<{ id: string | null, name: string | null }> | null };


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

export const DeleteAttachmentDocument = new TypedDocumentString(`
    mutation DeleteAttachment($deleteAttachmentId: String!) {
  deleteAttachment(id: $deleteAttachmentId)
}
    `);

export const useDeleteAttachmentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteAttachmentMutation, TError, DeleteAttachmentMutationVariables, TContext>) => {
    
    return useMutation<DeleteAttachmentMutation, TError, DeleteAttachmentMutationVariables, TContext>(
      {
    mutationKey: ['DeleteAttachment'],
    mutationFn: (variables?: DeleteAttachmentMutationVariables) => graphQLFetcher<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>(DeleteAttachmentDocument, variables)(),
    ...options
  }
    )};

useDeleteAttachmentMutation.getKey = () => ['DeleteAttachment'];

export const CreateIssueDocument = new TypedDocumentString(`
    mutation CreateIssue($input: CreateIssueInput!) {
  createIssue(input: $input)
}
    `);

export const useCreateIssueMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateIssueMutation, TError, CreateIssueMutationVariables, TContext>) => {
    
    return useMutation<CreateIssueMutation, TError, CreateIssueMutationVariables, TContext>(
      {
    mutationKey: ['CreateIssue'],
    mutationFn: (variables?: CreateIssueMutationVariables) => graphQLFetcher<CreateIssueMutation, CreateIssueMutationVariables>(CreateIssueDocument, variables)(),
    ...options
  }
    )};

useCreateIssueMutation.getKey = () => ['CreateIssue'];

export const FindIssueDocument = new TypedDocumentString(`
    query FindIssue($findIssueId: String!) {
  findIssue(id: $findIssueId) {
    id
    description
    project {
      id
      name
    }
    parentIssue {
      id
      name
    }
    name
    statusId
    priority
  }
}
    `);

export const useFindIssueQuery = <
      TData = FindIssueQuery,
      TError = unknown
    >(
      variables: FindIssueQueryVariables,
      options?: Omit<UseQueryOptions<FindIssueQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindIssueQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindIssueQuery, TError, TData>(
      {
    queryKey: ['FindIssue', variables],
    queryFn: graphQLFetcher<FindIssueQuery, FindIssueQueryVariables>(FindIssueDocument, variables),
    ...options
  }
    )};

useFindIssueQuery.document = FindIssueDocument;

useFindIssueQuery.getKey = (variables: FindIssueQueryVariables) => ['FindIssue', variables];

export const FindProjectIssuesDocument = new TypedDocumentString(`
    query FindProjectIssues($projectId: String!) {
  findProjectIssues(projectId: $projectId) {
    description
    id
    name
    statusId
    priority
  }
}
    `);

export const useFindProjectIssuesQuery = <
      TData = FindProjectIssuesQuery,
      TError = unknown
    >(
      variables: FindProjectIssuesQueryVariables,
      options?: Omit<UseQueryOptions<FindProjectIssuesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindProjectIssuesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindProjectIssuesQuery, TError, TData>(
      {
    queryKey: ['FindProjectIssues', variables],
    queryFn: graphQLFetcher<FindProjectIssuesQuery, FindProjectIssuesQueryVariables>(FindProjectIssuesDocument, variables),
    ...options
  }
    )};

useFindProjectIssuesQuery.document = FindProjectIssuesDocument;

useFindProjectIssuesQuery.getKey = (variables: FindProjectIssuesQueryVariables) => ['FindProjectIssues', variables];

export const FindSubIssuesDocument = new TypedDocumentString(`
    query FindSubIssues($input: FindIssuesInput!) {
  findSubIssues(input: $input) {
    description
    id
    name
  }
}
    `);

export const useFindSubIssuesQuery = <
      TData = FindSubIssuesQuery,
      TError = unknown
    >(
      variables: FindSubIssuesQueryVariables,
      options?: Omit<UseQueryOptions<FindSubIssuesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindSubIssuesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindSubIssuesQuery, TError, TData>(
      {
    queryKey: ['FindSubIssues', variables],
    queryFn: graphQLFetcher<FindSubIssuesQuery, FindSubIssuesQueryVariables>(FindSubIssuesDocument, variables),
    ...options
  }
    )};

useFindSubIssuesQuery.document = FindSubIssuesDocument;

useFindSubIssuesQuery.getKey = (variables: FindSubIssuesQueryVariables) => ['FindSubIssues', variables];

export const UpdateIssueDocument = new TypedDocumentString(`
    mutation UpdateIssue($input: UpdateIssueInput!) {
  updateIssue(input: $input)
}
    `);

export const useUpdateIssueMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateIssueMutation, TError, UpdateIssueMutationVariables, TContext>) => {
    
    return useMutation<UpdateIssueMutation, TError, UpdateIssueMutationVariables, TContext>(
      {
    mutationKey: ['UpdateIssue'],
    mutationFn: (variables?: UpdateIssueMutationVariables) => graphQLFetcher<UpdateIssueMutation, UpdateIssueMutationVariables>(UpdateIssueDocument, variables)(),
    ...options
  }
    )};

useUpdateIssueMutation.getKey = () => ['UpdateIssue'];

export const GetMyOrganizationPreferenceDocument = new TypedDocumentString(`
    query GetMyOrganizationPreference {
  getMyOrganizationPreference {
    organizationId
    tenantId
    updatedAt
  }
}
    `);

export const useGetMyOrganizationPreferenceQuery = <
      TData = GetMyOrganizationPreferenceQuery,
      TError = unknown
    >(
      variables?: GetMyOrganizationPreferenceQueryVariables,
      options?: Omit<UseQueryOptions<GetMyOrganizationPreferenceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMyOrganizationPreferenceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMyOrganizationPreferenceQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetMyOrganizationPreference'] : ['GetMyOrganizationPreference', variables],
    queryFn: graphQLFetcher<GetMyOrganizationPreferenceQuery, GetMyOrganizationPreferenceQueryVariables>(GetMyOrganizationPreferenceDocument, variables),
    ...options
  }
    )};

useGetMyOrganizationPreferenceQuery.document = GetMyOrganizationPreferenceDocument;

useGetMyOrganizationPreferenceQuery.getKey = (variables?: GetMyOrganizationPreferenceQueryVariables) => variables === undefined ? ['GetMyOrganizationPreference'] : ['GetMyOrganizationPreference', variables];

export const GetMyOrganizationsDocument = new TypedDocumentString(`
    query GetMyOrganizations {
  getMyOrganizations {
    id
    tenantId
    parentOrganizationId
    name
    slug
    description
    isActive
    createdAt
    children {
      id
      tenantId
      parentOrganizationId
      name
      slug
      description
      isActive
      createdAt
      children {
        id
        tenantId
        parentOrganizationId
        name
        slug
        description
        isActive
        createdAt
        children {
          id
          tenantId
          parentOrganizationId
          name
          slug
          description
          isActive
          createdAt
          children {
            id
            tenantId
            parentOrganizationId
            name
            slug
            description
            isActive
            createdAt
            children {
              id
              tenantId
              parentOrganizationId
              name
              slug
              description
              isActive
              createdAt
            }
          }
        }
      }
    }
  }
}
    `);

export const useGetMyOrganizationsQuery = <
      TData = GetMyOrganizationsQuery,
      TError = unknown
    >(
      variables?: GetMyOrganizationsQueryVariables,
      options?: Omit<UseQueryOptions<GetMyOrganizationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetMyOrganizationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetMyOrganizationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetMyOrganizations'] : ['GetMyOrganizations', variables],
    queryFn: graphQLFetcher<GetMyOrganizationsQuery, GetMyOrganizationsQueryVariables>(GetMyOrganizationsDocument, variables),
    ...options
  }
    )};

useGetMyOrganizationsQuery.document = GetMyOrganizationsDocument;

useGetMyOrganizationsQuery.getKey = (variables?: GetMyOrganizationsQueryVariables) => variables === undefined ? ['GetMyOrganizations'] : ['GetMyOrganizations', variables];

export const SetMyOrganizationPreferenceDocument = new TypedDocumentString(`
    mutation SetMyOrganizationPreference($organizationId: String!) {
  setMyOrganizationPreference(organizationId: $organizationId) {
    organizationId
    tenantId
    updatedAt
  }
}
    `);

export const useSetMyOrganizationPreferenceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetMyOrganizationPreferenceMutation, TError, SetMyOrganizationPreferenceMutationVariables, TContext>) => {
    
    return useMutation<SetMyOrganizationPreferenceMutation, TError, SetMyOrganizationPreferenceMutationVariables, TContext>(
      {
    mutationKey: ['SetMyOrganizationPreference'],
    mutationFn: (variables?: SetMyOrganizationPreferenceMutationVariables) => graphQLFetcher<SetMyOrganizationPreferenceMutation, SetMyOrganizationPreferenceMutationVariables>(SetMyOrganizationPreferenceDocument, variables)(),
    ...options
  }
    )};

useSetMyOrganizationPreferenceMutation.getKey = () => ['SetMyOrganizationPreference'];

export const CreateProjectDocument = new TypedDocumentString(`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input)
}
    `);

export const useCreateProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>) => {
    
    return useMutation<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>(
      {
    mutationKey: ['CreateProject'],
    mutationFn: (variables?: CreateProjectMutationVariables) => graphQLFetcher<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, variables)(),
    ...options
  }
    )};

useCreateProjectMutation.getKey = () => ['CreateProject'];

export const FindProjectDocument = new TypedDocumentString(`
    query FindProject($findProjectId: String!) {
  findProject(id: $findProjectId) {
    id
    name
  }
}
    `);

export const useFindProjectQuery = <
      TData = FindProjectQuery,
      TError = unknown
    >(
      variables: FindProjectQueryVariables,
      options?: Omit<UseQueryOptions<FindProjectQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindProjectQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindProjectQuery, TError, TData>(
      {
    queryKey: ['FindProject', variables],
    queryFn: graphQLFetcher<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, variables),
    ...options
  }
    )};

useFindProjectQuery.document = FindProjectDocument;

useFindProjectQuery.getKey = (variables: FindProjectQueryVariables) => ['FindProject', variables];

export const FindProjectsDocument = new TypedDocumentString(`
    query FindProjects {
  findProjects {
    rows {
      id
      name
    }
    rowCount
  }
}
    `);

export const useFindProjectsQuery = <
      TData = FindProjectsQuery,
      TError = unknown
    >(
      variables?: FindProjectsQueryVariables,
      options?: Omit<UseQueryOptions<FindProjectsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindProjectsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindProjectsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindProjects'] : ['FindProjects', variables],
    queryFn: graphQLFetcher<FindProjectsQuery, FindProjectsQueryVariables>(FindProjectsDocument, variables),
    ...options
  }
    )};

useFindProjectsQuery.document = FindProjectsDocument;

useFindProjectsQuery.getKey = (variables?: FindProjectsQueryVariables) => variables === undefined ? ['FindProjects'] : ['FindProjects', variables];

export const FindStatusesDocument = new TypedDocumentString(`
    query FindStatuses($input: FindStatusesOptions!) {
  findStatuses(input: $input) {
    id
    name
  }
}
    `);

export const useFindStatusesQuery = <
      TData = FindStatusesQuery,
      TError = unknown
    >(
      variables: FindStatusesQueryVariables,
      options?: Omit<UseQueryOptions<FindStatusesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindStatusesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindStatusesQuery, TError, TData>(
      {
    queryKey: ['FindStatuses', variables],
    queryFn: graphQLFetcher<FindStatusesQuery, FindStatusesQueryVariables>(FindStatusesDocument, variables),
    ...options
  }
    )};

useFindStatusesQuery.document = FindStatusesDocument;

useFindStatusesQuery.getKey = (variables: FindStatusesQueryVariables) => ['FindStatuses', variables];
