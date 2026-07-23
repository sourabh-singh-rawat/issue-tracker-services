/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type * as Types from './graphql';

import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '../../api/graphql/client';
export type DeleteAttachmentMutationVariables = Exact<{
  deleteAttachmentId: string;
}>;


export type DeleteAttachmentMutation = { deleteAttachment: string };

export type FindFilesQueryVariables = Exact<{
  issueId: string;
}>;


export type FindFilesQuery = { findFiles: { rowCount: number, rows: Array<{ id: string, thumbnailLink: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: string };

export type RegisterUserWithEmailAndPasswordMutationVariables = Exact<{
  input: Types.RegisterUserInput;
}>;


export type RegisterUserWithEmailAndPasswordMutation = { registerUserWithEmailAndPassword: string };

export type SignInWithEmailAndPasswordMutationVariables = Exact<{
  input: Types.SignInWithEmailAndPasswordInput;
}>;


export type SignInWithEmailAndPasswordMutation = { signInWithEmailAndPassword: boolean };

export type VerifyVerificationLinkMutationVariables = Exact<{
  input: Types.VerifyVerificationLinkInput;
}>;


export type VerifyVerificationLinkMutation = { verifyVerificationLink: string };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { getCurrentUser: { userId: string, email: string, emailVerificationStatus: string, createdAt: unknown, displayName: string | null, photoUrl: string | null, description: string | null } | null };

export type CreateIssueMutationVariables = Exact<{
  input: Types.CreateIssueInput;
}>;


export type CreateIssueMutation = { createIssue: string };

export type UpdateIssueMutationVariables = Exact<{
  input: Types.UpdateIssueInput;
}>;


export type UpdateIssueMutation = { updateIssue: string };

export type FindIssueQueryVariables = Exact<{
  findIssueId: string;
}>;


export type FindIssueQuery = { findIssue: { id: string, description: string | null, name: string, statusId: string, priority: string, project: { id: string, name: string }, parentIssue: { id: string, name: string } | null } | null };

export type FindProjectIssuesQueryVariables = Exact<{
  projectId: string;
}>;


export type FindProjectIssuesQuery = { findProjectIssues: Array<{ description: string | null, id: string, name: string, statusId: string, priority: string }> };

export type FindSubIssuesQueryVariables = Exact<{
  input: Types.FindIssuesInput;
}>;


export type FindSubIssuesQuery = { findSubIssues: Array<{ description: string | null, id: string, name: string }> };

export type CreateProjectMutationVariables = Exact<{
  input: Types.CreateProjectInput;
}>;


export type CreateProjectMutation = { createProject: string };

export type FindProjectQueryVariables = Exact<{
  findProjectId: string;
}>;


export type FindProjectQuery = { findProject: { id: string, name: string, workspaceId: string, workspace: { id: string, name: string } } };

export type FindProjectsQueryVariables = Exact<{
  input?: Types.FindProjectsOptions | null | undefined;
}>;


export type FindProjectsQuery = { findProjects: { rowCount: number, rows: Array<{ id: string, name: string, workspaceId: string, workspace: { id: string, name: string } }> } };

export type FindStatusesQueryVariables = Exact<{
  input: Types.FindStatusesOptions;
}>;


export type FindStatusesQuery = { findStatuses: Array<{ id: string, name: string }> };

export type CreateWorkspaceMutationVariables = Exact<{
  input: Types.CreateWorkspaceInput;
}>;


export type CreateWorkspaceMutation = { createWorkspace: string };

export type FindDefaultWorkspaceQueryVariables = Exact<{ [key: string]: never; }>;


export type FindDefaultWorkspaceQuery = { findDefaultWorkspace: { createdById: string, description: string | null, id: string, name: string, status: string } };

export type FindWorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindWorkspacesQuery = { findWorkspaces: Array<{ description: string | null, id: string, name: string, createdById: string, status: string }> };


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
    mutationFn: (variables?: DeleteAttachmentMutationVariables) => customFetcher<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>(DeleteAttachmentDocument, variables)(),
    ...options
  }
    )};

useDeleteAttachmentMutation.getKey = () => ['DeleteAttachment'];

export const FindFilesDocument = new TypedDocumentString(`
    query FindFiles($issueId: String!) {
  findFiles(issueId: $issueId) {
    rowCount
    rows {
      id
      thumbnailLink
    }
  }
}
    `);

export const useFindFilesQuery = <
      TData = FindFilesQuery,
      TError = unknown
    >(
      variables: FindFilesQueryVariables,
      options?: Omit<UseQueryOptions<FindFilesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindFilesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindFilesQuery, TError, TData>(
      {
    queryKey: ['FindFiles', variables],
    queryFn: customFetcher<FindFilesQuery, FindFilesQueryVariables>(FindFilesDocument, variables),
    ...options
  }
    )};

useFindFilesQuery.document = FindFilesDocument;

useFindFilesQuery.getKey = (variables: FindFilesQueryVariables) => ['FindFiles', variables];

export const LogoutDocument = new TypedDocumentString(`
    mutation Logout {
  logout
}
    `);

export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>) => {
    
    return useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      {
    mutationKey: ['Logout'],
    mutationFn: (variables?: LogoutMutationVariables) => customFetcher<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables)(),
    ...options
  }
    )};

useLogoutMutation.getKey = () => ['Logout'];

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
    mutationFn: (variables?: RegisterUserWithEmailAndPasswordMutationVariables) => customFetcher<RegisterUserWithEmailAndPasswordMutation, RegisterUserWithEmailAndPasswordMutationVariables>(RegisterUserWithEmailAndPasswordDocument, variables)(),
    ...options
  }
    )};

useRegisterUserWithEmailAndPasswordMutation.getKey = () => ['RegisterUserWithEmailAndPassword'];

export const SignInWithEmailAndPasswordDocument = new TypedDocumentString(`
    mutation SignInWithEmailAndPassword($input: SignInWithEmailAndPasswordInput!) {
  signInWithEmailAndPassword(input: $input)
}
    `);

export const useSignInWithEmailAndPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignInWithEmailAndPasswordMutation, TError, SignInWithEmailAndPasswordMutationVariables, TContext>) => {
    
    return useMutation<SignInWithEmailAndPasswordMutation, TError, SignInWithEmailAndPasswordMutationVariables, TContext>(
      {
    mutationKey: ['SignInWithEmailAndPassword'],
    mutationFn: (variables?: SignInWithEmailAndPasswordMutationVariables) => customFetcher<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>(SignInWithEmailAndPasswordDocument, variables)(),
    ...options
  }
    )};

useSignInWithEmailAndPasswordMutation.getKey = () => ['SignInWithEmailAndPassword'];

export const VerifyVerificationLinkDocument = new TypedDocumentString(`
    mutation VerifyVerificationLink($input: VerifyVerificationLinkInput!) {
  verifyVerificationLink(input: $input)
}
    `);

export const useVerifyVerificationLinkMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<VerifyVerificationLinkMutation, TError, VerifyVerificationLinkMutationVariables, TContext>) => {
    
    return useMutation<VerifyVerificationLinkMutation, TError, VerifyVerificationLinkMutationVariables, TContext>(
      {
    mutationKey: ['VerifyVerificationLink'],
    mutationFn: (variables?: VerifyVerificationLinkMutationVariables) => customFetcher<VerifyVerificationLinkMutation, VerifyVerificationLinkMutationVariables>(VerifyVerificationLinkDocument, variables)(),
    ...options
  }
    )};

useVerifyVerificationLinkMutation.getKey = () => ['VerifyVerificationLink'];

export const GetCurrentUserDocument = new TypedDocumentString(`
    query GetCurrentUser {
  getCurrentUser {
    userId
    email
    emailVerificationStatus
    createdAt
    displayName
    photoUrl
    description
  }
}
    `);

export const useGetCurrentUserQuery = <
      TData = GetCurrentUserQuery,
      TError = unknown
    >(
      variables?: GetCurrentUserQueryVariables,
      options?: Omit<UseQueryOptions<GetCurrentUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCurrentUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCurrentUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCurrentUser'] : ['GetCurrentUser', variables],
    queryFn: customFetcher<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, variables),
    ...options
  }
    )};

useGetCurrentUserQuery.document = GetCurrentUserDocument;

useGetCurrentUserQuery.getKey = (variables?: GetCurrentUserQueryVariables) => variables === undefined ? ['GetCurrentUser'] : ['GetCurrentUser', variables];

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
    mutationFn: (variables?: CreateIssueMutationVariables) => customFetcher<CreateIssueMutation, CreateIssueMutationVariables>(CreateIssueDocument, variables)(),
    ...options
  }
    )};

useCreateIssueMutation.getKey = () => ['CreateIssue'];

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
    mutationFn: (variables?: UpdateIssueMutationVariables) => customFetcher<UpdateIssueMutation, UpdateIssueMutationVariables>(UpdateIssueDocument, variables)(),
    ...options
  }
    )};

useUpdateIssueMutation.getKey = () => ['UpdateIssue'];

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
    queryFn: customFetcher<FindIssueQuery, FindIssueQueryVariables>(FindIssueDocument, variables),
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
    queryFn: customFetcher<FindProjectIssuesQuery, FindProjectIssuesQueryVariables>(FindProjectIssuesDocument, variables),
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
    queryFn: customFetcher<FindSubIssuesQuery, FindSubIssuesQueryVariables>(FindSubIssuesDocument, variables),
    ...options
  }
    )};

useFindSubIssuesQuery.document = FindSubIssuesDocument;

useFindSubIssuesQuery.getKey = (variables: FindSubIssuesQueryVariables) => ['FindSubIssues', variables];

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
    mutationFn: (variables?: CreateProjectMutationVariables) => customFetcher<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, variables)(),
    ...options
  }
    )};

useCreateProjectMutation.getKey = () => ['CreateProject'];

export const FindProjectDocument = new TypedDocumentString(`
    query FindProject($findProjectId: String!) {
  findProject(id: $findProjectId) {
    id
    name
    workspaceId
    workspace {
      id
      name
    }
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
    queryFn: customFetcher<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, variables),
    ...options
  }
    )};

useFindProjectQuery.document = FindProjectDocument;

useFindProjectQuery.getKey = (variables: FindProjectQueryVariables) => ['FindProject', variables];

export const FindProjectsDocument = new TypedDocumentString(`
    query FindProjects($input: FindProjectsOptions) {
  findProjects(input: $input) {
    rows {
      id
      name
      workspaceId
      workspace {
        id
        name
      }
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
    queryFn: customFetcher<FindProjectsQuery, FindProjectsQueryVariables>(FindProjectsDocument, variables),
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
    queryFn: customFetcher<FindStatusesQuery, FindStatusesQueryVariables>(FindStatusesDocument, variables),
    ...options
  }
    )};

useFindStatusesQuery.document = FindStatusesDocument;

useFindStatusesQuery.getKey = (variables: FindStatusesQueryVariables) => ['FindStatuses', variables];

export const CreateWorkspaceDocument = new TypedDocumentString(`
    mutation CreateWorkspace($input: CreateWorkspaceInput!) {
  createWorkspace(input: $input)
}
    `);

export const useCreateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['CreateWorkspace'],
    mutationFn: (variables?: CreateWorkspaceMutationVariables) => customFetcher<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument, variables)(),
    ...options
  }
    )};

useCreateWorkspaceMutation.getKey = () => ['CreateWorkspace'];

export const FindDefaultWorkspaceDocument = new TypedDocumentString(`
    query FindDefaultWorkspace {
  findDefaultWorkspace {
    createdById
    description
    id
    name
    status
  }
}
    `);

export const useFindDefaultWorkspaceQuery = <
      TData = FindDefaultWorkspaceQuery,
      TError = unknown
    >(
      variables?: FindDefaultWorkspaceQueryVariables,
      options?: Omit<UseQueryOptions<FindDefaultWorkspaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindDefaultWorkspaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindDefaultWorkspaceQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindDefaultWorkspace'] : ['FindDefaultWorkspace', variables],
    queryFn: customFetcher<FindDefaultWorkspaceQuery, FindDefaultWorkspaceQueryVariables>(FindDefaultWorkspaceDocument, variables),
    ...options
  }
    )};

useFindDefaultWorkspaceQuery.document = FindDefaultWorkspaceDocument;

useFindDefaultWorkspaceQuery.getKey = (variables?: FindDefaultWorkspaceQueryVariables) => variables === undefined ? ['FindDefaultWorkspace'] : ['FindDefaultWorkspace', variables];

export const FindWorkspacesDocument = new TypedDocumentString(`
    query FindWorkspaces {
  findWorkspaces {
    description
    id
    name
    createdById
    status
  }
}
    `);

export const useFindWorkspacesQuery = <
      TData = FindWorkspacesQuery,
      TError = unknown
    >(
      variables?: FindWorkspacesQueryVariables,
      options?: Omit<UseQueryOptions<FindWorkspacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindWorkspacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindWorkspacesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindWorkspaces'] : ['FindWorkspaces', variables],
    queryFn: customFetcher<FindWorkspacesQuery, FindWorkspacesQueryVariables>(FindWorkspacesDocument, variables),
    ...options
  }
    )};

useFindWorkspacesQuery.document = FindWorkspacesDocument;

useFindWorkspacesQuery.getKey = (variables?: FindWorkspacesQueryVariables) => variables === undefined ? ['FindWorkspaces'] : ['FindWorkspaces', variables];
