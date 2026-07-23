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
};

export type FileOutput = {
  __typename?: 'FileOutput';
  bucket: Scalars['String']['output'];
  id: Scalars['String']['output'];
  thumbnailLink: Scalars['String']['output'];
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

export type FindIssuesInput = {
  parentIssueId: Scalars['String']['input'];
};

export type FindProjectsOptions = {
  workspaceId?: InputMaybe<Scalars['String']['input']>;
};

export type FindStatusesOptions = {
  projectId: Scalars['String']['input'];
};

export type Issue = {
  __typename?: 'Issue';
  component?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  estimate?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentIssue?: Maybe<Issue>;
  priority: Scalars['String']['output'];
  project: Project;
  statusId: Scalars['String']['output'];
  subIssues?: Maybe<Array<Issue>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createIssue: Scalars['String']['output'];
  createProject: Scalars['String']['output'];
  createWorkspace: Scalars['String']['output'];
  deleteAttachment: Scalars['String']['output'];
  deleteIssue: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  registerUserWithEmailAndPassword: Scalars['String']['output'];
  signInWithEmailAndPassword: Scalars['Boolean']['output'];
  updateIssue: Scalars['String']['output'];
  verifyVerificationLink: Scalars['String']['output'];
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


export type MutationRegisterUserWithEmailAndPasswordArgs = {
  input: RegisterUserInput;
};


export type MutationSignInWithEmailAndPasswordArgs = {
  input: SignInWithEmailAndPasswordInput;
};


export type MutationUpdateIssueArgs = {
  input: UpdateIssueInput;
};


export type MutationVerifyVerificationLinkArgs = {
  input: VerifyVerificationLinkInput;
};

export type PaginatedFileOutput = {
  __typename?: 'PaginatedFileOutput';
  rowCount: Scalars['Float']['output'];
  rows: Array<FileOutput>;
};

export type PaginatedProject = {
  __typename?: 'PaginatedProject';
  rowCount: Scalars['Float']['output'];
  rows: Array<Project>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  workspace: Workspace;
  workspaceId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  findDefaultWorkspace: Workspace;
  findFiles: PaginatedFileOutput;
  findIssue?: Maybe<Issue>;
  findProject: Project;
  findProjectIssues: Array<Issue>;
  findProjects: PaginatedProject;
  findStatuses: Array<Status>;
  findSubIssues: Array<Issue>;
  findWorkspaces: Array<Workspace>;
  getCurrentUser?: Maybe<User>;
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

export type RegisterUserInput = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInWithEmailAndPasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
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
  createdById: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
};
