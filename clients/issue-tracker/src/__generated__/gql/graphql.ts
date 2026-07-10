export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: string; output: string; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
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
  getCurrentUser?: Maybe<User>;
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
