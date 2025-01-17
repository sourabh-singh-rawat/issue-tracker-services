import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Attachment = {
  __typename?: 'Attachment';
  bucket: Scalars['String']['output'];
  id: Scalars['String']['output'];
  thumbnailLink: Scalars['String']['output'];
};

export type CreateItemInput = {
  assigneeIds: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  fields?: InputMaybe<Scalars['JSON']['input']>;
  listId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentItemId?: InputMaybe<Scalars['String']['input']>;
  priority: Scalars['String']['input'];
  statusId: Scalars['ID']['input'];
  type: Scalars['String']['input'];
};

export type CreateListInput = {
  name: Scalars['String']['input'];
  spaceId: Scalars['String']['input'];
};

export type CreateSpaceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};

export type CreateWorkspaceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type FindCustomFieldsOptions = {
  listId: Scalars['String']['input'];
};

export type FindItemsInput = {
  parentItemId: Scalars['String']['input'];
};

export type FindSpacesOptions = {
  workspaceId: Scalars['String']['input'];
};

export type FindStatusesOptions = {
  listId: Scalars['String']['input'];
};

export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  list: List;
  name: Scalars['String']['output'];
  parentItem?: Maybe<Item>;
  priority: Scalars['String']['output'];
  statusId: Scalars['String']['output'];
  subItems?: Maybe<Array<Item>>;
};

export type List = {
  __typename?: 'List';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  selectedViewId?: Maybe<Scalars['String']['output']>;
  space: Space;
};

export type ListCustomField = {
  __typename?: 'ListCustomField';
  customFieldId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  listId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Scalars['String']['output'];
  createList: Scalars['String']['output'];
  createSpace: Scalars['String']['output'];
  createWorkspace: Scalars['String']['output'];
  deleteAttachment: Scalars['String']['output'];
  deleteItem: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  registerUser: Scalars['String']['output'];
  signInWithEmailAndPassword: Scalars['Boolean']['output'];
  updateItem: Scalars['String']['output'];
  verifyVerificationLink: Scalars['String']['output'];
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationCreateListArgs = {
  input: CreateListInput;
};


export type MutationCreateSpaceArgs = {
  input: CreateSpaceInput;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationDeleteAttachmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationSignInWithEmailAndPasswordArgs = {
  input: SignInWithEmailAndPasswordInput;
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};


export type MutationVerifyVerificationLinkArgs = {
  input: VerifyVerificationLinkInput;
};

export type PaginatedAttachment = {
  __typename?: 'PaginatedAttachment';
  rowCount: Scalars['Float']['output'];
  rows: Array<Attachment>;
};

export type PaginatedList = {
  __typename?: 'PaginatedList';
  rowCount: Scalars['Float']['output'];
  rows: Array<List>;
};

export type Query = {
  __typename?: 'Query';
  findAttachments: PaginatedAttachment;
  findCustomFields: Array<ListCustomField>;
  findDefaultWorkspace: Workspace;
  findItem?: Maybe<Item>;
  findList: List;
  findListItems: Array<Item>;
  findLists: PaginatedList;
  findSpaces: Array<Space>;
  findStatuses: Array<Status>;
  findSubItems: Array<Item>;
  findView: View;
  findViews: Array<View>;
  findWorkspaces: Array<Workspace>;
  getCurrentUser: User;
};


export type QueryFindAttachmentsArgs = {
  itemId: Scalars['String']['input'];
};


export type QueryFindCustomFieldsArgs = {
  options: FindCustomFieldsOptions;
};


export type QueryFindItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindListArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindListItemsArgs = {
  listId: Scalars['String']['input'];
};


export type QueryFindSpacesArgs = {
  input: FindSpacesOptions;
};


export type QueryFindStatusesArgs = {
  input: FindStatusesOptions;
};


export type QueryFindSubItemsArgs = {
  input: FindItemsInput;
};


export type QueryFindViewArgs = {
  viewId: Scalars['String']['input'];
};


export type QueryFindViewsArgs = {
  listId: Scalars['String']['input'];
};

export type RegisterUserInput = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInWithEmailAndPasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Space = {
  __typename?: 'Space';
  id: Scalars['String']['output'];
  lists?: Maybe<Array<List>>;
  name: Scalars['String']['output'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UpdateItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  itemId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerificationStatus: Scalars['String']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type VerifyVerificationLinkInput = {
  token: Scalars['String']['input'];
};

export type View = {
  __typename?: 'View';
  id: Scalars['String']['output'];
  list: List;
  name: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  type: Scalars['String']['output'];
};

export type Workspace = {
  __typename?: 'Workspace';
  createdById: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type DeleteAttachmentMutationVariables = Exact<{
  deleteAttachmentId: Scalars['String']['input'];
}>;


export type DeleteAttachmentMutation = { __typename?: 'Mutation', deleteAttachment: string };

export type FindAttachmentsQueryVariables = Exact<{
  itemId: Scalars['String']['input'];
}>;


export type FindAttachmentsQuery = { __typename?: 'Query', findAttachments: { __typename?: 'PaginatedAttachment', rowCount: number, rows: Array<{ __typename?: 'Attachment', id: string, thumbnailLink: string }> } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', userId: string, email: string, emailVerificationStatus: string, createdAt: any, displayName?: string | null, photoUrl?: string | null, description?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: string };

export type SignInWithEmailAndPasswordMutationVariables = Exact<{
  input: SignInWithEmailAndPasswordInput;
}>;


export type SignInWithEmailAndPasswordMutation = { __typename?: 'Mutation', signInWithEmailAndPassword: boolean };

export type VerifyVerificationLinkMutationVariables = Exact<{
  input: VerifyVerificationLinkInput;
}>;


export type VerifyVerificationLinkMutation = { __typename?: 'Mutation', verifyVerificationLink: string };

export type CreateItemMutationVariables = Exact<{
  input: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: string };

export type CreateListMutationVariables = Exact<{
  input: CreateListInput;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: string };

export type CreateSpaceMutationVariables = Exact<{
  input: CreateSpaceInput;
}>;


export type CreateSpaceMutation = { __typename?: 'Mutation', createSpace: string };

export type CreateWorkspaceMutationVariables = Exact<{
  input: CreateWorkspaceInput;
}>;


export type CreateWorkspaceMutation = { __typename?: 'Mutation', createWorkspace: string };

export type FindCustomFieldsQueryVariables = Exact<{
  options: FindCustomFieldsOptions;
}>;


export type FindCustomFieldsQuery = { __typename?: 'Query', findCustomFields: Array<{ __typename?: 'ListCustomField', customFieldId: string, id: string, listId: string }> };

export type FindDefaultWorkspaceQueryVariables = Exact<{ [key: string]: never; }>;


export type FindDefaultWorkspaceQuery = { __typename?: 'Query', findDefaultWorkspace: { __typename?: 'Workspace', createdById: string, description?: string | null, id: string, name: string, status: string } };

export type FindItemQueryVariables = Exact<{
  findItemId: Scalars['String']['input'];
}>;


export type FindItemQuery = { __typename?: 'Query', findItem?: { __typename?: 'Item', id: string, description?: string | null, name: string, statusId: string, priority: string, list: { __typename?: 'List', id: string, name: string }, parentItem?: { __typename?: 'Item', id: string, name: string } | null } | null };

export type FindListQueryVariables = Exact<{
  findListId: Scalars['String']['input'];
}>;


export type FindListQuery = { __typename?: 'Query', findList: { __typename?: 'List', id: string, name: string } };

export type FindListItemsQueryVariables = Exact<{
  listId: Scalars['String']['input'];
}>;


export type FindListItemsQuery = { __typename?: 'Query', findListItems: Array<{ __typename?: 'Item', description?: string | null, id: string, name: string, statusId: string, priority: string }> };

export type FindListsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindListsQuery = { __typename?: 'Query', findLists: { __typename?: 'PaginatedList', rowCount: number, rows: Array<{ __typename?: 'List', id: string, name: string, space: { __typename?: 'Space', id: string, name: string } }> } };

export type FindSpacesQueryVariables = Exact<{
  input: FindSpacesOptions;
}>;


export type FindSpacesQuery = { __typename?: 'Query', findSpaces: Array<{ __typename?: 'Space', id: string, name: string, lists?: Array<{ __typename?: 'List', id: string, name: string, selectedViewId?: string | null, space: { __typename?: 'Space', name: string } }> | null }> };

export type FindStatusesQueryVariables = Exact<{
  input: FindStatusesOptions;
}>;


export type FindStatusesQuery = { __typename?: 'Query', findStatuses: Array<{ __typename?: 'Status', id: string, name: string }> };

export type FindSubItemsQueryVariables = Exact<{
  input: FindItemsInput;
}>;


export type FindSubItemsQuery = { __typename?: 'Query', findSubItems: Array<{ __typename?: 'Item', description?: string | null, id: string, name: string }> };

export type FindViewQueryVariables = Exact<{
  viewId: Scalars['String']['input'];
}>;


export type FindViewQuery = { __typename?: 'Query', findView: { __typename?: 'View', id: string, name: string, type: string, order: number, list: { __typename?: 'List', id: string, name: string, selectedViewId?: string | null, space: { __typename?: 'Space', id: string, name: string } } } };

export type FindViewsQueryVariables = Exact<{
  listId: Scalars['String']['input'];
}>;


export type FindViewsQuery = { __typename?: 'Query', findViews: Array<{ __typename?: 'View', id: string, name: string, type: string, order: number, list: { __typename?: 'List', id: string, name: string, selectedViewId?: string | null, space: { __typename?: 'Space', id: string, name: string } } }> };

export type FindWorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindWorkspacesQuery = { __typename?: 'Query', findWorkspaces: Array<{ __typename?: 'Workspace', description?: string | null, id: string, name: string, createdById: string, status: string }> };

export type UpdateItemMutationVariables = Exact<{
  input: UpdateItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: string };


export const DeleteAttachmentDocument = gql`
    mutation DeleteAttachment($deleteAttachmentId: String!) {
  deleteAttachment(id: $deleteAttachmentId)
}
    `;
export type DeleteAttachmentMutationFn = Apollo.MutationFunction<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>;

/**
 * __useDeleteAttachmentMutation__
 *
 * To run a mutation, you first call `useDeleteAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAttachmentMutation, { data, loading, error }] = useDeleteAttachmentMutation({
 *   variables: {
 *      deleteAttachmentId: // value for 'deleteAttachmentId'
 *   },
 * });
 */
export function useDeleteAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>(DeleteAttachmentDocument, options);
      }
export type DeleteAttachmentMutationHookResult = ReturnType<typeof useDeleteAttachmentMutation>;
export type DeleteAttachmentMutationResult = Apollo.MutationResult<DeleteAttachmentMutation>;
export type DeleteAttachmentMutationOptions = Apollo.BaseMutationOptions<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>;
export const FindAttachmentsDocument = gql`
    query FindAttachments($itemId: String!) {
  findAttachments(itemId: $itemId) {
    rowCount
    rows {
      id
      thumbnailLink
    }
  }
}
    `;

/**
 * __useFindAttachmentsQuery__
 *
 * To run a query within a React component, call `useFindAttachmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAttachmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAttachmentsQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useFindAttachmentsQuery(baseOptions: Apollo.QueryHookOptions<FindAttachmentsQuery, FindAttachmentsQueryVariables> & ({ variables: FindAttachmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAttachmentsQuery, FindAttachmentsQueryVariables>(FindAttachmentsDocument, options);
      }
export function useFindAttachmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAttachmentsQuery, FindAttachmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAttachmentsQuery, FindAttachmentsQueryVariables>(FindAttachmentsDocument, options);
        }
export function useFindAttachmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAttachmentsQuery, FindAttachmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAttachmentsQuery, FindAttachmentsQueryVariables>(FindAttachmentsDocument, options);
        }
export type FindAttachmentsQueryHookResult = ReturnType<typeof useFindAttachmentsQuery>;
export type FindAttachmentsLazyQueryHookResult = ReturnType<typeof useFindAttachmentsLazyQuery>;
export type FindAttachmentsSuspenseQueryHookResult = ReturnType<typeof useFindAttachmentsSuspenseQuery>;
export type FindAttachmentsQueryResult = Apollo.QueryResult<FindAttachmentsQuery, FindAttachmentsQueryVariables>;
export const GetCurrentUserDocument = gql`
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
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input)
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const SignInWithEmailAndPasswordDocument = gql`
    mutation SignInWithEmailAndPassword($input: SignInWithEmailAndPasswordInput!) {
  signInWithEmailAndPassword(input: $input)
}
    `;
export type SignInWithEmailAndPasswordMutationFn = Apollo.MutationFunction<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>;

/**
 * __useSignInWithEmailAndPasswordMutation__
 *
 * To run a mutation, you first call `useSignInWithEmailAndPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithEmailAndPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithEmailAndPasswordMutation, { data, loading, error }] = useSignInWithEmailAndPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInWithEmailAndPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>(SignInWithEmailAndPasswordDocument, options);
      }
export type SignInWithEmailAndPasswordMutationHookResult = ReturnType<typeof useSignInWithEmailAndPasswordMutation>;
export type SignInWithEmailAndPasswordMutationResult = Apollo.MutationResult<SignInWithEmailAndPasswordMutation>;
export type SignInWithEmailAndPasswordMutationOptions = Apollo.BaseMutationOptions<SignInWithEmailAndPasswordMutation, SignInWithEmailAndPasswordMutationVariables>;
export const VerifyVerificationLinkDocument = gql`
    mutation VerifyVerificationLink($input: VerifyVerificationLinkInput!) {
  verifyVerificationLink(input: $input)
}
    `;
export type VerifyVerificationLinkMutationFn = Apollo.MutationFunction<VerifyVerificationLinkMutation, VerifyVerificationLinkMutationVariables>;

/**
 * __useVerifyVerificationLinkMutation__
 *
 * To run a mutation, you first call `useVerifyVerificationLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyVerificationLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyVerificationLinkMutation, { data, loading, error }] = useVerifyVerificationLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyVerificationLinkMutation(baseOptions?: Apollo.MutationHookOptions<VerifyVerificationLinkMutation, VerifyVerificationLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyVerificationLinkMutation, VerifyVerificationLinkMutationVariables>(VerifyVerificationLinkDocument, options);
      }
export type VerifyVerificationLinkMutationHookResult = ReturnType<typeof useVerifyVerificationLinkMutation>;
export type VerifyVerificationLinkMutationResult = Apollo.MutationResult<VerifyVerificationLinkMutation>;
export type VerifyVerificationLinkMutationOptions = Apollo.BaseMutationOptions<VerifyVerificationLinkMutation, VerifyVerificationLinkMutationVariables>;
export const CreateItemDocument = gql`
    mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input)
}
    `;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const CreateListDocument = gql`
    mutation CreateList($input: CreateListInput!) {
  createList(input: $input)
}
    `;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const CreateSpaceDocument = gql`
    mutation CreateSpace($input: CreateSpaceInput!) {
  createSpace(input: $input)
}
    `;
export type CreateSpaceMutationFn = Apollo.MutationFunction<CreateSpaceMutation, CreateSpaceMutationVariables>;

/**
 * __useCreateSpaceMutation__
 *
 * To run a mutation, you first call `useCreateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSpaceMutation, { data, loading, error }] = useCreateSpaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSpaceMutation(baseOptions?: Apollo.MutationHookOptions<CreateSpaceMutation, CreateSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSpaceMutation, CreateSpaceMutationVariables>(CreateSpaceDocument, options);
      }
export type CreateSpaceMutationHookResult = ReturnType<typeof useCreateSpaceMutation>;
export type CreateSpaceMutationResult = Apollo.MutationResult<CreateSpaceMutation>;
export type CreateSpaceMutationOptions = Apollo.BaseMutationOptions<CreateSpaceMutation, CreateSpaceMutationVariables>;
export const CreateWorkspaceDocument = gql`
    mutation CreateWorkspace($input: CreateWorkspaceInput!) {
  createWorkspace(input: $input)
}
    `;
export type CreateWorkspaceMutationFn = Apollo.MutationFunction<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>;

/**
 * __useCreateWorkspaceMutation__
 *
 * To run a mutation, you first call `useCreateWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkspaceMutation, { data, loading, error }] = useCreateWorkspaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkspaceMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument, options);
      }
export type CreateWorkspaceMutationHookResult = ReturnType<typeof useCreateWorkspaceMutation>;
export type CreateWorkspaceMutationResult = Apollo.MutationResult<CreateWorkspaceMutation>;
export type CreateWorkspaceMutationOptions = Apollo.BaseMutationOptions<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>;
export const FindCustomFieldsDocument = gql`
    query FindCustomFields($options: FindCustomFieldsOptions!) {
  findCustomFields(options: $options) {
    customFieldId
    id
    listId
  }
}
    `;

/**
 * __useFindCustomFieldsQuery__
 *
 * To run a query within a React component, call `useFindCustomFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCustomFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCustomFieldsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useFindCustomFieldsQuery(baseOptions: Apollo.QueryHookOptions<FindCustomFieldsQuery, FindCustomFieldsQueryVariables> & ({ variables: FindCustomFieldsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCustomFieldsQuery, FindCustomFieldsQueryVariables>(FindCustomFieldsDocument, options);
      }
export function useFindCustomFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCustomFieldsQuery, FindCustomFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCustomFieldsQuery, FindCustomFieldsQueryVariables>(FindCustomFieldsDocument, options);
        }
export function useFindCustomFieldsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindCustomFieldsQuery, FindCustomFieldsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindCustomFieldsQuery, FindCustomFieldsQueryVariables>(FindCustomFieldsDocument, options);
        }
export type FindCustomFieldsQueryHookResult = ReturnType<typeof useFindCustomFieldsQuery>;
export type FindCustomFieldsLazyQueryHookResult = ReturnType<typeof useFindCustomFieldsLazyQuery>;
export type FindCustomFieldsSuspenseQueryHookResult = ReturnType<typeof useFindCustomFieldsSuspenseQuery>;
export type FindCustomFieldsQueryResult = Apollo.QueryResult<FindCustomFieldsQuery, FindCustomFieldsQueryVariables>;
export const FindDefaultWorkspaceDocument = gql`
    query FindDefaultWorkspace {
  findDefaultWorkspace {
    createdById
    description
    id
    name
    status
  }
}
    `;

/**
 * __useFindDefaultWorkspaceQuery__
 *
 * To run a query within a React component, call `useFindDefaultWorkspaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDefaultWorkspaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDefaultWorkspaceQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindDefaultWorkspaceQuery(baseOptions?: Apollo.QueryHookOptions<FindDefaultWorkspaceQuery, FindDefaultWorkspaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindDefaultWorkspaceQuery, FindDefaultWorkspaceQueryVariables>(FindDefaultWorkspaceDocument, options);
      }
export function useFindDefaultWorkspaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDefaultWorkspaceQuery, FindDefaultWorkspaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindDefaultWorkspaceQuery, FindDefaultWorkspaceQueryVariables>(FindDefaultWorkspaceDocument, options);
        }
export function useFindDefaultWorkspaceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindDefaultWorkspaceQuery, FindDefaultWorkspaceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindDefaultWorkspaceQuery, FindDefaultWorkspaceQueryVariables>(FindDefaultWorkspaceDocument, options);
        }
export type FindDefaultWorkspaceQueryHookResult = ReturnType<typeof useFindDefaultWorkspaceQuery>;
export type FindDefaultWorkspaceLazyQueryHookResult = ReturnType<typeof useFindDefaultWorkspaceLazyQuery>;
export type FindDefaultWorkspaceSuspenseQueryHookResult = ReturnType<typeof useFindDefaultWorkspaceSuspenseQuery>;
export type FindDefaultWorkspaceQueryResult = Apollo.QueryResult<FindDefaultWorkspaceQuery, FindDefaultWorkspaceQueryVariables>;
export const FindItemDocument = gql`
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
    `;

/**
 * __useFindItemQuery__
 *
 * To run a query within a React component, call `useFindItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindItemQuery({
 *   variables: {
 *      findItemId: // value for 'findItemId'
 *   },
 * });
 */
export function useFindItemQuery(baseOptions: Apollo.QueryHookOptions<FindItemQuery, FindItemQueryVariables> & ({ variables: FindItemQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindItemQuery, FindItemQueryVariables>(FindItemDocument, options);
      }
export function useFindItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindItemQuery, FindItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindItemQuery, FindItemQueryVariables>(FindItemDocument, options);
        }
export function useFindItemSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindItemQuery, FindItemQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindItemQuery, FindItemQueryVariables>(FindItemDocument, options);
        }
export type FindItemQueryHookResult = ReturnType<typeof useFindItemQuery>;
export type FindItemLazyQueryHookResult = ReturnType<typeof useFindItemLazyQuery>;
export type FindItemSuspenseQueryHookResult = ReturnType<typeof useFindItemSuspenseQuery>;
export type FindItemQueryResult = Apollo.QueryResult<FindItemQuery, FindItemQueryVariables>;
export const FindListDocument = gql`
    query FindList($findListId: String!) {
  findList(id: $findListId) {
    id
    name
  }
}
    `;

/**
 * __useFindListQuery__
 *
 * To run a query within a React component, call `useFindListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindListQuery({
 *   variables: {
 *      findListId: // value for 'findListId'
 *   },
 * });
 */
export function useFindListQuery(baseOptions: Apollo.QueryHookOptions<FindListQuery, FindListQueryVariables> & ({ variables: FindListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindListQuery, FindListQueryVariables>(FindListDocument, options);
      }
export function useFindListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindListQuery, FindListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindListQuery, FindListQueryVariables>(FindListDocument, options);
        }
export function useFindListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindListQuery, FindListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindListQuery, FindListQueryVariables>(FindListDocument, options);
        }
export type FindListQueryHookResult = ReturnType<typeof useFindListQuery>;
export type FindListLazyQueryHookResult = ReturnType<typeof useFindListLazyQuery>;
export type FindListSuspenseQueryHookResult = ReturnType<typeof useFindListSuspenseQuery>;
export type FindListQueryResult = Apollo.QueryResult<FindListQuery, FindListQueryVariables>;
export const FindListItemsDocument = gql`
    query FindListItems($listId: String!) {
  findListItems(listId: $listId) {
    description
    id
    name
    statusId
    priority
  }
}
    `;

/**
 * __useFindListItemsQuery__
 *
 * To run a query within a React component, call `useFindListItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindListItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindListItemsQuery({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useFindListItemsQuery(baseOptions: Apollo.QueryHookOptions<FindListItemsQuery, FindListItemsQueryVariables> & ({ variables: FindListItemsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindListItemsQuery, FindListItemsQueryVariables>(FindListItemsDocument, options);
      }
export function useFindListItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindListItemsQuery, FindListItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindListItemsQuery, FindListItemsQueryVariables>(FindListItemsDocument, options);
        }
export function useFindListItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindListItemsQuery, FindListItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindListItemsQuery, FindListItemsQueryVariables>(FindListItemsDocument, options);
        }
export type FindListItemsQueryHookResult = ReturnType<typeof useFindListItemsQuery>;
export type FindListItemsLazyQueryHookResult = ReturnType<typeof useFindListItemsLazyQuery>;
export type FindListItemsSuspenseQueryHookResult = ReturnType<typeof useFindListItemsSuspenseQuery>;
export type FindListItemsQueryResult = Apollo.QueryResult<FindListItemsQuery, FindListItemsQueryVariables>;
export const FindListsDocument = gql`
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
    `;

/**
 * __useFindListsQuery__
 *
 * To run a query within a React component, call `useFindListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindListsQuery(baseOptions?: Apollo.QueryHookOptions<FindListsQuery, FindListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindListsQuery, FindListsQueryVariables>(FindListsDocument, options);
      }
export function useFindListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindListsQuery, FindListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindListsQuery, FindListsQueryVariables>(FindListsDocument, options);
        }
export function useFindListsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindListsQuery, FindListsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindListsQuery, FindListsQueryVariables>(FindListsDocument, options);
        }
export type FindListsQueryHookResult = ReturnType<typeof useFindListsQuery>;
export type FindListsLazyQueryHookResult = ReturnType<typeof useFindListsLazyQuery>;
export type FindListsSuspenseQueryHookResult = ReturnType<typeof useFindListsSuspenseQuery>;
export type FindListsQueryResult = Apollo.QueryResult<FindListsQuery, FindListsQueryVariables>;
export const FindSpacesDocument = gql`
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
    `;

/**
 * __useFindSpacesQuery__
 *
 * To run a query within a React component, call `useFindSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSpacesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindSpacesQuery(baseOptions: Apollo.QueryHookOptions<FindSpacesQuery, FindSpacesQueryVariables> & ({ variables: FindSpacesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSpacesQuery, FindSpacesQueryVariables>(FindSpacesDocument, options);
      }
export function useFindSpacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSpacesQuery, FindSpacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSpacesQuery, FindSpacesQueryVariables>(FindSpacesDocument, options);
        }
export function useFindSpacesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSpacesQuery, FindSpacesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSpacesQuery, FindSpacesQueryVariables>(FindSpacesDocument, options);
        }
export type FindSpacesQueryHookResult = ReturnType<typeof useFindSpacesQuery>;
export type FindSpacesLazyQueryHookResult = ReturnType<typeof useFindSpacesLazyQuery>;
export type FindSpacesSuspenseQueryHookResult = ReturnType<typeof useFindSpacesSuspenseQuery>;
export type FindSpacesQueryResult = Apollo.QueryResult<FindSpacesQuery, FindSpacesQueryVariables>;
export const FindStatusesDocument = gql`
    query FindStatuses($input: FindStatusesOptions!) {
  findStatuses(input: $input) {
    id
    name
  }
}
    `;

/**
 * __useFindStatusesQuery__
 *
 * To run a query within a React component, call `useFindStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStatusesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindStatusesQuery(baseOptions: Apollo.QueryHookOptions<FindStatusesQuery, FindStatusesQueryVariables> & ({ variables: FindStatusesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindStatusesQuery, FindStatusesQueryVariables>(FindStatusesDocument, options);
      }
export function useFindStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindStatusesQuery, FindStatusesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindStatusesQuery, FindStatusesQueryVariables>(FindStatusesDocument, options);
        }
export function useFindStatusesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindStatusesQuery, FindStatusesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindStatusesQuery, FindStatusesQueryVariables>(FindStatusesDocument, options);
        }
export type FindStatusesQueryHookResult = ReturnType<typeof useFindStatusesQuery>;
export type FindStatusesLazyQueryHookResult = ReturnType<typeof useFindStatusesLazyQuery>;
export type FindStatusesSuspenseQueryHookResult = ReturnType<typeof useFindStatusesSuspenseQuery>;
export type FindStatusesQueryResult = Apollo.QueryResult<FindStatusesQuery, FindStatusesQueryVariables>;
export const FindSubItemsDocument = gql`
    query FindSubItems($input: FindItemsInput!) {
  findSubItems(input: $input) {
    description
    id
    name
  }
}
    `;

/**
 * __useFindSubItemsQuery__
 *
 * To run a query within a React component, call `useFindSubItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSubItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSubItemsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindSubItemsQuery(baseOptions: Apollo.QueryHookOptions<FindSubItemsQuery, FindSubItemsQueryVariables> & ({ variables: FindSubItemsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSubItemsQuery, FindSubItemsQueryVariables>(FindSubItemsDocument, options);
      }
export function useFindSubItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSubItemsQuery, FindSubItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSubItemsQuery, FindSubItemsQueryVariables>(FindSubItemsDocument, options);
        }
export function useFindSubItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindSubItemsQuery, FindSubItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindSubItemsQuery, FindSubItemsQueryVariables>(FindSubItemsDocument, options);
        }
export type FindSubItemsQueryHookResult = ReturnType<typeof useFindSubItemsQuery>;
export type FindSubItemsLazyQueryHookResult = ReturnType<typeof useFindSubItemsLazyQuery>;
export type FindSubItemsSuspenseQueryHookResult = ReturnType<typeof useFindSubItemsSuspenseQuery>;
export type FindSubItemsQueryResult = Apollo.QueryResult<FindSubItemsQuery, FindSubItemsQueryVariables>;
export const FindViewDocument = gql`
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
    `;

/**
 * __useFindViewQuery__
 *
 * To run a query within a React component, call `useFindViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindViewQuery({
 *   variables: {
 *      viewId: // value for 'viewId'
 *   },
 * });
 */
export function useFindViewQuery(baseOptions: Apollo.QueryHookOptions<FindViewQuery, FindViewQueryVariables> & ({ variables: FindViewQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindViewQuery, FindViewQueryVariables>(FindViewDocument, options);
      }
export function useFindViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindViewQuery, FindViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindViewQuery, FindViewQueryVariables>(FindViewDocument, options);
        }
export function useFindViewSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindViewQuery, FindViewQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindViewQuery, FindViewQueryVariables>(FindViewDocument, options);
        }
export type FindViewQueryHookResult = ReturnType<typeof useFindViewQuery>;
export type FindViewLazyQueryHookResult = ReturnType<typeof useFindViewLazyQuery>;
export type FindViewSuspenseQueryHookResult = ReturnType<typeof useFindViewSuspenseQuery>;
export type FindViewQueryResult = Apollo.QueryResult<FindViewQuery, FindViewQueryVariables>;
export const FindViewsDocument = gql`
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
    `;

/**
 * __useFindViewsQuery__
 *
 * To run a query within a React component, call `useFindViewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindViewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindViewsQuery({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useFindViewsQuery(baseOptions: Apollo.QueryHookOptions<FindViewsQuery, FindViewsQueryVariables> & ({ variables: FindViewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindViewsQuery, FindViewsQueryVariables>(FindViewsDocument, options);
      }
export function useFindViewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindViewsQuery, FindViewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindViewsQuery, FindViewsQueryVariables>(FindViewsDocument, options);
        }
export function useFindViewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindViewsQuery, FindViewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindViewsQuery, FindViewsQueryVariables>(FindViewsDocument, options);
        }
export type FindViewsQueryHookResult = ReturnType<typeof useFindViewsQuery>;
export type FindViewsLazyQueryHookResult = ReturnType<typeof useFindViewsLazyQuery>;
export type FindViewsSuspenseQueryHookResult = ReturnType<typeof useFindViewsSuspenseQuery>;
export type FindViewsQueryResult = Apollo.QueryResult<FindViewsQuery, FindViewsQueryVariables>;
export const FindWorkspacesDocument = gql`
    query FindWorkspaces {
  findWorkspaces {
    description
    id
    name
    createdById
    status
  }
}
    `;

/**
 * __useFindWorkspacesQuery__
 *
 * To run a query within a React component, call `useFindWorkspacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindWorkspacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindWorkspacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindWorkspacesQuery(baseOptions?: Apollo.QueryHookOptions<FindWorkspacesQuery, FindWorkspacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindWorkspacesQuery, FindWorkspacesQueryVariables>(FindWorkspacesDocument, options);
      }
export function useFindWorkspacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindWorkspacesQuery, FindWorkspacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindWorkspacesQuery, FindWorkspacesQueryVariables>(FindWorkspacesDocument, options);
        }
export function useFindWorkspacesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindWorkspacesQuery, FindWorkspacesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindWorkspacesQuery, FindWorkspacesQueryVariables>(FindWorkspacesDocument, options);
        }
export type FindWorkspacesQueryHookResult = ReturnType<typeof useFindWorkspacesQuery>;
export type FindWorkspacesLazyQueryHookResult = ReturnType<typeof useFindWorkspacesLazyQuery>;
export type FindWorkspacesSuspenseQueryHookResult = ReturnType<typeof useFindWorkspacesSuspenseQuery>;
export type FindWorkspacesQueryResult = Apollo.QueryResult<FindWorkspacesQuery, FindWorkspacesQueryVariables>;
export const UpdateItemDocument = gql`
    mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input)
}
    `;
export type UpdateItemMutationFn = Apollo.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = Apollo.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = Apollo.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;