export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: string; output: string; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: unknown; output: unknown; }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: { input: unknown; output: unknown; }
  join__FieldSet: { input: unknown; output: unknown; }
  link__Import: { input: unknown; output: unknown; }
};

export type ClientObject = {
  __typename?: 'ClientObject';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  grantTypes?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  redirectUris?: Maybe<Array<Scalars['String']['output']>>;
  scopes?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type CreateClientInput = {
  grantTypes: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  redirectUris?: InputMaybe<Array<Scalars['String']['input']>>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateIssueInput = {
  assigneeIds: Array<Scalars['String']['input']>;
  component?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  estimate?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  parentIssueId?: InputMaybe<Scalars['String']['input']>;
  priority: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  statusId: Scalars['ID']['input'];
  type: Scalars['String']['input'];
};

export type CreateProjectInput = {
  name: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};

export type CreateWorkspaceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type DeleteIdentityInput = {
  identityId: Scalars['String']['input'];
};

export type FileOutput = {
  __typename?: 'FileOutput';
  bucket?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  thumbnailLink?: Maybe<Scalars['String']['output']>;
};

export type FindIssuesInput = {
  parentIssueId: Scalars['String']['input'];
};

export type FindProjectsOptions = {
  workspaceId?: InputMaybe<Scalars['String']['input']>;
};

export type FindStatusesOptions = {
  projectId: Scalars['String']['input'];
};

export type HelloXyz = {
  __typename?: 'HelloXYZ';
  message?: Maybe<Scalars['String']['output']>;
  message2?: Maybe<Scalars['String']['output']>;
};

export type IdentityObject = {
  __typename?: 'IdentityObject';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  idpId?: Maybe<Scalars['String']['output']>;
  idpProvider?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type IssueObject = {
  __typename?: 'IssueObject';
  component?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  estimate?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentIssue?: Maybe<IssueObject>;
  priority?: Maybe<Scalars['String']['output']>;
  project?: Maybe<ProjectObject>;
  statusId?: Maybe<Scalars['String']['output']>;
  subIssues?: Maybe<Array<IssueObject>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClient?: Maybe<ClientObject>;
  createIssue?: Maybe<Scalars['String']['output']>;
  createProject?: Maybe<Scalars['String']['output']>;
  createWorkspace?: Maybe<Scalars['String']['output']>;
  deleteAttachment?: Maybe<Scalars['String']['output']>;
  deleteClient?: Maybe<Scalars['String']['output']>;
  deleteIdentity?: Maybe<Scalars['String']['output']>;
  deleteIssue?: Maybe<Scalars['String']['output']>;
  hello?: Maybe<Scalars['String']['output']>;
  updateIssue?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateClientArgs = {
  input: CreateClientInput;
};


export type MutationCreateIssueArgs = {
  input: CreateIssueInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationDeleteAttachmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteIdentityArgs = {
  input: DeleteIdentityInput;
};


export type MutationDeleteIssueArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateIssueArgs = {
  input: UpdateIssueInput;
};

export type PaginatedFileOutput = {
  __typename?: 'PaginatedFileOutput';
  rowCount?: Maybe<Scalars['Float']['output']>;
  rows?: Maybe<Array<FileOutput>>;
};

export type PaginatedProjectObject = {
  __typename?: 'PaginatedProjectObject';
  rowCount?: Maybe<Scalars['Float']['output']>;
  rows?: Maybe<Array<ProjectObject>>;
};

export type ProjectObject = {
  __typename?: 'ProjectObject';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  workspace?: Maybe<WorkspaceObject>;
  workspaceId?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findDefaultWorkspace?: Maybe<WorkspaceObject>;
  findFiles?: Maybe<PaginatedFileOutput>;
  findIdentities?: Maybe<Array<IdentityObject>>;
  findIssue?: Maybe<IssueObject>;
  findProject?: Maybe<ProjectObject>;
  findProjectIssues?: Maybe<Array<IssueObject>>;
  findProjects?: Maybe<PaginatedProjectObject>;
  findStatuses?: Maybe<Array<StatusObject>>;
  findSubIssues?: Maybe<Array<IssueObject>>;
  findWorkspaces?: Maybe<Array<WorkspaceObject>>;
  getClient?: Maybe<ClientObject>;
  hello?: Maybe<HelloXyz>;
  hello2?: Maybe<Scalars['String']['output']>;
};


export type QueryFindFilesArgs = {
  issueId: Scalars['String']['input'];
};


export type QueryFindIssueArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindProjectArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindProjectIssuesArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryFindProjectsArgs = {
  input?: InputMaybe<FindProjectsOptions>;
};


export type QueryFindStatusesArgs = {
  input: FindStatusesOptions;
};


export type QueryFindSubIssuesArgs = {
  input: FindIssuesInput;
};


export type QueryGetClientArgs = {
  id: Scalars['String']['input'];
};

export type StatusObject = {
  __typename?: 'StatusObject';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type UpdateIssueInput = {
  component?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  estimate?: InputMaybe<Scalars['Int']['input']>;
  issueId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type WorkspaceObject = {
  __typename?: 'WorkspaceObject';
  createdById?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Join__Graph =
  | 'ATTACHMENT'
  | 'IDENTITY_SERVICE'
  | 'ISSUES_SERVICE';

export type Link__Purpose =
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  | 'EXECUTION'
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  | 'SECURITY';
