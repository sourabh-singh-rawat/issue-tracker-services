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

export type FindAttachmentsQueryVariables = Exact<{
  itemId: string;
}>;


export type FindAttachmentsQuery = { findAttachments: { rowCount: number, rows: Array<{ id: string, thumbnailLink: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: string };

export type RegisterUserMutationVariables = Exact<{
  input: Types.RegisterUserInput;
}>;


export type RegisterUserMutation = { registerUser: string };

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

export type CreateItemMutationVariables = Exact<{
  input: Types.CreateItemInput;
}>;


export type CreateItemMutation = { createItem: string };

export type UpdateItemMutationVariables = Exact<{
  input: Types.UpdateItemInput;
}>;


export type UpdateItemMutation = { updateItem: string };

export type FindItemQueryVariables = Exact<{
  findItemId: string;
}>;


export type FindItemQuery = { findItem: { id: string, description: string | null, name: string, statusId: string, priority: string, list: { id: string, name: string }, parentItem: { id: string, name: string } | null } | null };

export type FindListItemsQueryVariables = Exact<{
  listId: string;
}>;


export type FindListItemsQuery = { findListItems: Array<{ description: string | null, id: string, name: string, statusId: string, priority: string }> };

export type FindSubItemsQueryVariables = Exact<{
  input: Types.FindItemsInput;
}>;


export type FindSubItemsQuery = { findSubItems: Array<{ description: string | null, id: string, name: string }> };

export type CreateListMutationVariables = Exact<{
  input: Types.CreateListInput;
}>;


export type CreateListMutation = { createList: string };

export type FindListQueryVariables = Exact<{
  findListId: string;
}>;


export type FindListQuery = { findList: { id: string, name: string } };

export type FindListsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindListsQuery = { findLists: { rowCount: number, rows: Array<{ id: string, name: string, space: { id: string, name: string } }> } };

export type FindStatusesQueryVariables = Exact<{
  input: Types.FindStatusesOptions;
}>;


export type FindStatusesQuery = { findStatuses: Array<{ id: string, name: string }> };

export type FindCustomFieldsQueryVariables = Exact<{
  options: Types.FindCustomFieldsOptions;
}>;


export type FindCustomFieldsQuery = { findCustomFields: Array<{ customFieldId: string, id: string, listId: string }> };

export type CreateSpaceMutationVariables = Exact<{
  input: Types.CreateSpaceInput;
}>;


export type CreateSpaceMutation = { createSpace: string };

export type FindSpacesQueryVariables = Exact<{
  input: Types.FindSpacesOptions;
}>;


export type FindSpacesQuery = { findSpaces: Array<{ id: string, name: string, lists: Array<{ id: string, name: string, selectedViewId: string | null, space: { name: string } }> | null }> };

export type FindViewQueryVariables = Exact<{
  viewId: string;
}>;


export type FindViewQuery = { findView: { id: string, name: string, type: string, order: number, list: { id: string, name: string, selectedViewId: string | null, space: { id: string, name: string } } } };

export type FindViewsQueryVariables = Exact<{
  listId: string;
}>;


export type FindViewsQuery = { findViews: Array<{ id: string, name: string, type: string, order: number, list: { id: string, name: string, selectedViewId: string | null, space: { id: string, name: string } } }> };

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

export const FindAttachmentsDocument = new TypedDocumentString(`
    query FindAttachments($itemId: String!) {
  findAttachments(itemId: $itemId) {
    rowCount
    rows {
      id
      thumbnailLink
    }
  }
}
    `);

export const useFindAttachmentsQuery = <
      TData = FindAttachmentsQuery,
      TError = unknown
    >(
      variables: FindAttachmentsQueryVariables,
      options?: Omit<UseQueryOptions<FindAttachmentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindAttachmentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindAttachmentsQuery, TError, TData>(
      {
    queryKey: ['FindAttachments', variables],
    queryFn: customFetcher<FindAttachmentsQuery, FindAttachmentsQueryVariables>(FindAttachmentsDocument, variables),
    ...options
  }
    )};

useFindAttachmentsQuery.document = FindAttachmentsDocument;

useFindAttachmentsQuery.getKey = (variables: FindAttachmentsQueryVariables) => ['FindAttachments', variables];

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

export const RegisterUserDocument = new TypedDocumentString(`
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input)
}
    `);

export const useRegisterUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>) => {
    
    return useMutation<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>(
      {
    mutationKey: ['RegisterUser'],
    mutationFn: (variables?: RegisterUserMutationVariables) => customFetcher<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, variables)(),
    ...options
  }
    )};

useRegisterUserMutation.getKey = () => ['RegisterUser'];

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

export const CreateItemDocument = new TypedDocumentString(`
    mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input)
}
    `);

export const useCreateItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateItemMutation, TError, CreateItemMutationVariables, TContext>) => {
    
    return useMutation<CreateItemMutation, TError, CreateItemMutationVariables, TContext>(
      {
    mutationKey: ['CreateItem'],
    mutationFn: (variables?: CreateItemMutationVariables) => customFetcher<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, variables)(),
    ...options
  }
    )};

useCreateItemMutation.getKey = () => ['CreateItem'];

export const UpdateItemDocument = new TypedDocumentString(`
    mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input)
}
    `);

export const useUpdateItemMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateItemMutation, TError, UpdateItemMutationVariables, TContext>) => {
    
    return useMutation<UpdateItemMutation, TError, UpdateItemMutationVariables, TContext>(
      {
    mutationKey: ['UpdateItem'],
    mutationFn: (variables?: UpdateItemMutationVariables) => customFetcher<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, variables)(),
    ...options
  }
    )};

useUpdateItemMutation.getKey = () => ['UpdateItem'];

export const FindItemDocument = new TypedDocumentString(`
    query FindItem($findItemId: String!) {
  findItem(id: $findItemId) {
    id
    description
    list {
      id
      name
    }
    parentItem {
      id
      name
    }
    name
    statusId
    priority
  }
}
    `);

export const useFindItemQuery = <
      TData = FindItemQuery,
      TError = unknown
    >(
      variables: FindItemQueryVariables,
      options?: Omit<UseQueryOptions<FindItemQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindItemQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindItemQuery, TError, TData>(
      {
    queryKey: ['FindItem', variables],
    queryFn: customFetcher<FindItemQuery, FindItemQueryVariables>(FindItemDocument, variables),
    ...options
  }
    )};

useFindItemQuery.document = FindItemDocument;

useFindItemQuery.getKey = (variables: FindItemQueryVariables) => ['FindItem', variables];

export const FindListItemsDocument = new TypedDocumentString(`
    query FindListItems($listId: String!) {
  findListItems(listId: $listId) {
    description
    id
    name
    statusId
    priority
  }
}
    `);

export const useFindListItemsQuery = <
      TData = FindListItemsQuery,
      TError = unknown
    >(
      variables: FindListItemsQueryVariables,
      options?: Omit<UseQueryOptions<FindListItemsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindListItemsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindListItemsQuery, TError, TData>(
      {
    queryKey: ['FindListItems', variables],
    queryFn: customFetcher<FindListItemsQuery, FindListItemsQueryVariables>(FindListItemsDocument, variables),
    ...options
  }
    )};

useFindListItemsQuery.document = FindListItemsDocument;

useFindListItemsQuery.getKey = (variables: FindListItemsQueryVariables) => ['FindListItems', variables];

export const FindSubItemsDocument = new TypedDocumentString(`
    query FindSubItems($input: FindItemsInput!) {
  findSubItems(input: $input) {
    description
    id
    name
  }
}
    `);

export const useFindSubItemsQuery = <
      TData = FindSubItemsQuery,
      TError = unknown
    >(
      variables: FindSubItemsQueryVariables,
      options?: Omit<UseQueryOptions<FindSubItemsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindSubItemsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindSubItemsQuery, TError, TData>(
      {
    queryKey: ['FindSubItems', variables],
    queryFn: customFetcher<FindSubItemsQuery, FindSubItemsQueryVariables>(FindSubItemsDocument, variables),
    ...options
  }
    )};

useFindSubItemsQuery.document = FindSubItemsDocument;

useFindSubItemsQuery.getKey = (variables: FindSubItemsQueryVariables) => ['FindSubItems', variables];

export const CreateListDocument = new TypedDocumentString(`
    mutation CreateList($input: CreateListInput!) {
  createList(input: $input)
}
    `);

export const useCreateListMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateListMutation, TError, CreateListMutationVariables, TContext>) => {
    
    return useMutation<CreateListMutation, TError, CreateListMutationVariables, TContext>(
      {
    mutationKey: ['CreateList'],
    mutationFn: (variables?: CreateListMutationVariables) => customFetcher<CreateListMutation, CreateListMutationVariables>(CreateListDocument, variables)(),
    ...options
  }
    )};

useCreateListMutation.getKey = () => ['CreateList'];

export const FindListDocument = new TypedDocumentString(`
    query FindList($findListId: String!) {
  findList(id: $findListId) {
    id
    name
  }
}
    `);

export const useFindListQuery = <
      TData = FindListQuery,
      TError = unknown
    >(
      variables: FindListQueryVariables,
      options?: Omit<UseQueryOptions<FindListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindListQuery, TError, TData>(
      {
    queryKey: ['FindList', variables],
    queryFn: customFetcher<FindListQuery, FindListQueryVariables>(FindListDocument, variables),
    ...options
  }
    )};

useFindListQuery.document = FindListDocument;

useFindListQuery.getKey = (variables: FindListQueryVariables) => ['FindList', variables];

export const FindListsDocument = new TypedDocumentString(`
    query FindLists {
  findLists {
    rows {
      id
      name
      space {
        id
        name
      }
    }
    rowCount
  }
}
    `);

export const useFindListsQuery = <
      TData = FindListsQuery,
      TError = unknown
    >(
      variables?: FindListsQueryVariables,
      options?: Omit<UseQueryOptions<FindListsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindListsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindListsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FindLists'] : ['FindLists', variables],
    queryFn: customFetcher<FindListsQuery, FindListsQueryVariables>(FindListsDocument, variables),
    ...options
  }
    )};

useFindListsQuery.document = FindListsDocument;

useFindListsQuery.getKey = (variables?: FindListsQueryVariables) => variables === undefined ? ['FindLists'] : ['FindLists', variables];

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

export const FindCustomFieldsDocument = new TypedDocumentString(`
    query FindCustomFields($options: FindCustomFieldsOptions!) {
  findCustomFields(options: $options) {
    customFieldId
    id
    listId
  }
}
    `);

export const useFindCustomFieldsQuery = <
      TData = FindCustomFieldsQuery,
      TError = unknown
    >(
      variables: FindCustomFieldsQueryVariables,
      options?: Omit<UseQueryOptions<FindCustomFieldsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindCustomFieldsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindCustomFieldsQuery, TError, TData>(
      {
    queryKey: ['FindCustomFields', variables],
    queryFn: customFetcher<FindCustomFieldsQuery, FindCustomFieldsQueryVariables>(FindCustomFieldsDocument, variables),
    ...options
  }
    )};

useFindCustomFieldsQuery.document = FindCustomFieldsDocument;

useFindCustomFieldsQuery.getKey = (variables: FindCustomFieldsQueryVariables) => ['FindCustomFields', variables];

export const CreateSpaceDocument = new TypedDocumentString(`
    mutation CreateSpace($input: CreateSpaceInput!) {
  createSpace(input: $input)
}
    `);

export const useCreateSpaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateSpaceMutation, TError, CreateSpaceMutationVariables, TContext>) => {
    
    return useMutation<CreateSpaceMutation, TError, CreateSpaceMutationVariables, TContext>(
      {
    mutationKey: ['CreateSpace'],
    mutationFn: (variables?: CreateSpaceMutationVariables) => customFetcher<CreateSpaceMutation, CreateSpaceMutationVariables>(CreateSpaceDocument, variables)(),
    ...options
  }
    )};

useCreateSpaceMutation.getKey = () => ['CreateSpace'];

export const FindSpacesDocument = new TypedDocumentString(`
    query FindSpaces($input: FindSpacesOptions!) {
  findSpaces(input: $input) {
    id
    name
    lists {
      id
      name
      selectedViewId
      space {
        name
      }
    }
  }
}
    `);

export const useFindSpacesQuery = <
      TData = FindSpacesQuery,
      TError = unknown
    >(
      variables: FindSpacesQueryVariables,
      options?: Omit<UseQueryOptions<FindSpacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindSpacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindSpacesQuery, TError, TData>(
      {
    queryKey: ['FindSpaces', variables],
    queryFn: customFetcher<FindSpacesQuery, FindSpacesQueryVariables>(FindSpacesDocument, variables),
    ...options
  }
    )};

useFindSpacesQuery.document = FindSpacesDocument;

useFindSpacesQuery.getKey = (variables: FindSpacesQueryVariables) => ['FindSpaces', variables];

export const FindViewDocument = new TypedDocumentString(`
    query FindView($viewId: String!) {
  findView(viewId: $viewId) {
    id
    name
    type
    order
    list {
      id
      name
      selectedViewId
      space {
        id
        name
      }
    }
  }
}
    `);

export const useFindViewQuery = <
      TData = FindViewQuery,
      TError = unknown
    >(
      variables: FindViewQueryVariables,
      options?: Omit<UseQueryOptions<FindViewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindViewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindViewQuery, TError, TData>(
      {
    queryKey: ['FindView', variables],
    queryFn: customFetcher<FindViewQuery, FindViewQueryVariables>(FindViewDocument, variables),
    ...options
  }
    )};

useFindViewQuery.document = FindViewDocument;

useFindViewQuery.getKey = (variables: FindViewQueryVariables) => ['FindView', variables];

export const FindViewsDocument = new TypedDocumentString(`
    query FindViews($listId: String!) {
  findViews(listId: $listId) {
    id
    name
    type
    order
    list {
      id
      name
      selectedViewId
      space {
        id
        name
      }
    }
  }
}
    `);

export const useFindViewsQuery = <
      TData = FindViewsQuery,
      TError = unknown
    >(
      variables: FindViewsQueryVariables,
      options?: Omit<UseQueryOptions<FindViewsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FindViewsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FindViewsQuery, TError, TData>(
      {
    queryKey: ['FindViews', variables],
    queryFn: customFetcher<FindViewsQuery, FindViewsQueryVariables>(FindViewsDocument, variables),
    ...options
  }
    )};

useFindViewsQuery.document = FindViewsDocument;

useFindViewsQuery.getKey = (variables: FindViewsQueryVariables) => ['FindViews', variables];

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
