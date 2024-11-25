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
};

export type CreateItemInput = {
  assigneeIds: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  listId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  priority: Scalars['String']['input'];
  status: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateListInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateWorkspaceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  list: List;
  name: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type List = {
  __typename?: 'List';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: Scalars['String']['output'];
  createList: Scalars['String']['output'];
  createWorkspace: Scalars['String']['output'];
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


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
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

export type PaginatedItem = {
  __typename?: 'PaginatedItem';
  rowCount: Scalars['Float']['output'];
  rows: Array<Item>;
};

export type PaginatedList = {
  __typename?: 'PaginatedList';
  rowCount: Scalars['Float']['output'];
  rows: Array<List>;
};

export type Query = {
  __typename?: 'Query';
  findItem?: Maybe<Item>;
  findItems: PaginatedItem;
  findLists: PaginatedList;
  getAllWorkspaces: Array<Workspace>;
  getCurrentUser: User;
};


export type QueryFindItemArgs = {
  id: Scalars['String']['input'];
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

export type UpdateItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  itemId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
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

export type Workspace = {
  __typename?: 'Workspace';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerUserId: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', userId: string, email: string, emailVerificationStatus: string, createdAt: any, displayName?: string | null, photoUrl?: string | null, description?: string | null } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: string };

export type SignInWithEmailAndPasswordMutationVariables = Exact<{
  input: SignInWithEmailAndPasswordInput;
}>;


export type SignInWithEmailAndPasswordMutation = { __typename?: 'Mutation', signInWithEmailAndPassword: boolean };

export type CreateItemMutationVariables = Exact<{
  input: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: string };

export type CreateListMutationVariables = Exact<{
  input: CreateListInput;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: string };

export type FindItemQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindItemQuery = { __typename?: 'Query', findItem?: { __typename?: 'Item', id: string, name: string, description?: string | null, priority: string, status: string, list: { __typename?: 'List', id: string, name: string } } | null };

export type FindItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindItemsQuery = { __typename?: 'Query', findItems: { __typename?: 'PaginatedItem', rowCount: number, rows: Array<{ __typename?: 'Item', id: string, name: string, status: string, priority: string, list: { __typename?: 'List', id: string, name: string } }> } };

export type FindListsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindListsQuery = { __typename?: 'Query', findLists: { __typename?: 'PaginatedList', rowCount: number, rows: Array<{ __typename?: 'List', id: string, name: string }> } };

export type GetAllWorkspacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWorkspacesQuery = { __typename?: 'Query', getAllWorkspaces: Array<{ __typename?: 'Workspace', description?: string | null, id: string, name: string, ownerUserId: string, status: string }> };

export type UpdateItemMutationVariables = Exact<{
  input: UpdateItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: string };


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
export const FindItemDocument = gql`
    query FindItem($id: String!) {
  findItem(id: $id) {
    id
    list {
      id
      name
    }
    name
    description
    priority
    status
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
 *      id: // value for 'id'
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
export const FindItemsDocument = gql`
    query FindItems {
  findItems {
    rowCount
    rows {
      id
      name
      status
      priority
      list {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useFindItemsQuery__
 *
 * To run a query within a React component, call `useFindItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindItemsQuery(baseOptions?: Apollo.QueryHookOptions<FindItemsQuery, FindItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindItemsQuery, FindItemsQueryVariables>(FindItemsDocument, options);
      }
export function useFindItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindItemsQuery, FindItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindItemsQuery, FindItemsQueryVariables>(FindItemsDocument, options);
        }
export function useFindItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindItemsQuery, FindItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindItemsQuery, FindItemsQueryVariables>(FindItemsDocument, options);
        }
export type FindItemsQueryHookResult = ReturnType<typeof useFindItemsQuery>;
export type FindItemsLazyQueryHookResult = ReturnType<typeof useFindItemsLazyQuery>;
export type FindItemsSuspenseQueryHookResult = ReturnType<typeof useFindItemsSuspenseQuery>;
export type FindItemsQueryResult = Apollo.QueryResult<FindItemsQuery, FindItemsQueryVariables>;
export const FindListsDocument = gql`
    query FindLists {
  findLists {
    rows {
      id
      name
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
export const GetAllWorkspacesDocument = gql`
    query GetAllWorkspaces {
  getAllWorkspaces {
    description
    id
    name
    ownerUserId
    status
  }
}
    `;

/**
 * __useGetAllWorkspacesQuery__
 *
 * To run a query within a React component, call `useGetAllWorkspacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWorkspacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWorkspacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWorkspacesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWorkspacesQuery, GetAllWorkspacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWorkspacesQuery, GetAllWorkspacesQueryVariables>(GetAllWorkspacesDocument, options);
      }
export function useGetAllWorkspacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWorkspacesQuery, GetAllWorkspacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWorkspacesQuery, GetAllWorkspacesQueryVariables>(GetAllWorkspacesDocument, options);
        }
export function useGetAllWorkspacesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllWorkspacesQuery, GetAllWorkspacesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllWorkspacesQuery, GetAllWorkspacesQueryVariables>(GetAllWorkspacesDocument, options);
        }
export type GetAllWorkspacesQueryHookResult = ReturnType<typeof useGetAllWorkspacesQuery>;
export type GetAllWorkspacesLazyQueryHookResult = ReturnType<typeof useGetAllWorkspacesLazyQuery>;
export type GetAllWorkspacesSuspenseQueryHookResult = ReturnType<typeof useGetAllWorkspacesSuspenseQuery>;
export type GetAllWorkspacesQueryResult = Apollo.QueryResult<GetAllWorkspacesQuery, GetAllWorkspacesQueryVariables>;
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