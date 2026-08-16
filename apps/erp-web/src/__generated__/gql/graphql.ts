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

export type BrandObject = {
  __typename?: 'BrandObject';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type CategoryObject = {
  __typename?: 'CategoryObject';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentCategoryId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type ClientObject = {
  __typename?: 'ClientObject';
  grantTypes?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  redirectUris?: Maybe<Array<Scalars['String']['output']>>;
  scopes?: Maybe<Array<Scalars['String']['output']>>;
};

export type CreateBrandInput = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateClientInput = {
  grantTypes: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  redirectUris?: InputMaybe<Array<Scalars['String']['input']>>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateIdentityInput = {
  email: Scalars['String']['input'];
  emailVerified: Scalars['Boolean']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
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

export type CreateOrganizationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  parentOrganizationId?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type CreatePlatformMemberInput = {
  identityId: Scalars['String']['input'];
  relation: Scalars['String']['input'];
};

export type CreateProductInput = {
  brandId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  defaultUnitId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  productType: Scalars['String']['input'];
  sku: Scalars['String']['input'];
};

export type CreateProjectInput = {
  name: Scalars['String']['input'];
};

export type CreateTenantInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  platformId: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateTenantMemberInput = {
  identityId: Scalars['String']['input'];
  relation: Scalars['String']['input'];
  tenantId: Scalars['String']['input'];
};

export type CreateUnitInput = {
  code: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  symbol?: InputMaybe<Scalars['String']['input']>;
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
  createBrand?: Maybe<BrandObject>;
  createCategory?: Maybe<CategoryObject>;
  createClient?: Maybe<ClientObject>;
  createIdentity?: Maybe<IdentityObject>;
  createIssue?: Maybe<Scalars['String']['output']>;
  createOrganization?: Maybe<OrganizationObject>;
  createPlatformMember?: Maybe<PlatformMemberObject>;
  createProduct?: Maybe<ProductObject>;
  createProject?: Maybe<Scalars['String']['output']>;
  createTenant?: Maybe<TenantObject>;
  createTenantMember?: Maybe<TenantMemberObject>;
  createUnit?: Maybe<UnitObject>;
  deleteAttachment?: Maybe<Scalars['String']['output']>;
  deleteBrand?: Maybe<Scalars['String']['output']>;
  deleteClient?: Maybe<Scalars['String']['output']>;
  deleteIdentity?: Maybe<Scalars['String']['output']>;
  deleteIssue?: Maybe<Scalars['String']['output']>;
  deleteOrganization?: Maybe<Scalars['String']['output']>;
  deletePlatformMember?: Maybe<Scalars['String']['output']>;
  deleteTenant?: Maybe<Scalars['String']['output']>;
  deleteTenantMember?: Maybe<Scalars['Boolean']['output']>;
  deleteUnit?: Maybe<Scalars['String']['output']>;
  hello?: Maybe<Scalars['String']['output']>;
  updateBrand?: Maybe<BrandObject>;
  updateCategory?: Maybe<CategoryObject>;
  updateIssue?: Maybe<Scalars['String']['output']>;
  updateOrganization?: Maybe<OrganizationObject>;
  updateUnit?: Maybe<UnitObject>;
};


export type MutationCreateBrandArgs = {
  input: CreateBrandInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateClientArgs = {
  input: CreateClientInput;
};


export type MutationCreateIdentityArgs = {
  input: CreateIdentityInput;
};


export type MutationCreateIssueArgs = {
  input: CreateIssueInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreatePlatformMemberArgs = {
  input: CreatePlatformMemberInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateTenantArgs = {
  input: CreateTenantInput;
};


export type MutationCreateTenantMemberArgs = {
  input: CreateTenantMemberInput;
};


export type MutationCreateUnitArgs = {
  input: CreateUnitInput;
};


export type MutationDeleteAttachmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteBrandArgs = {
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


export type MutationDeleteOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePlatformMemberArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTenantArgs = {
  id: Scalars['String']['input'];
  platformId: Scalars['String']['input'];
};


export type MutationDeleteTenantMemberArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUnitArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateBrandArgs = {
  input: UpdateBrandInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateIssueArgs = {
  input: UpdateIssueInput;
};


export type MutationUpdateOrganizationArgs = {
  id: Scalars['String']['input'];
  input: UpdateOrganizationInput;
};


export type MutationUpdateUnitArgs = {
  input: UpdateUnitInput;
};

export type OrganizationObject = {
  __typename?: 'OrganizationObject';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentOrganizationId?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
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

export type PlatformIdentityObject = {
  __typename?: 'PlatformIdentityObject';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PlatformMemberObject = {
  __typename?: 'PlatformMemberObject';
  id?: Maybe<Scalars['String']['output']>;
  identityId?: Maybe<Scalars['String']['output']>;
  relation?: Maybe<Scalars['String']['output']>;
};

export type ProductObject = {
  __typename?: 'ProductObject';
  brandId?: Maybe<Scalars['String']['output']>;
  categoryId?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  defaultUnitId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type ProjectObject = {
  __typename?: 'ProjectObject';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findBrands?: Maybe<Array<BrandObject>>;
  findFiles?: Maybe<PaginatedFileOutput>;
  findIdentities?: Maybe<Array<IdentityObject>>;
  findIssue?: Maybe<IssueObject>;
  findProject?: Maybe<ProjectObject>;
  findProjectIssues?: Maybe<Array<IssueObject>>;
  findProjects?: Maybe<PaginatedProjectObject>;
  findStatuses?: Maybe<Array<StatusObject>>;
  findSubIssues?: Maybe<Array<IssueObject>>;
  findUnits?: Maybe<Array<UnitObject>>;
  getBrand?: Maybe<BrandObject>;
  getClient?: Maybe<ClientObject>;
  getIdentities?: Maybe<Array<PlatformIdentityObject>>;
  getOrganization?: Maybe<OrganizationObject>;
  getOrganizations?: Maybe<Array<OrganizationObject>>;
  getPlatformMember?: Maybe<PlatformMemberObject>;
  getPlatformMembers?: Maybe<Array<PlatformMemberObject>>;
  getProduct?: Maybe<ProductObject>;
  getTenant?: Maybe<TenantObject>;
  getTenantMember?: Maybe<TenantMemberObject>;
  getTenantMembers?: Maybe<Array<TenantMemberObject>>;
  getTenants?: Maybe<Array<TenantObject>>;
  getUnit?: Maybe<UnitObject>;
  hello?: Maybe<HelloXyz>;
  hello2?: Maybe<Scalars['String']['output']>;
  productServiceHealth?: Maybe<Scalars['String']['output']>;
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


export type QueryFindStatusesArgs = {
  input: FindStatusesOptions;
};


export type QueryFindSubIssuesArgs = {
  input: FindIssuesInput;
};


export type QueryGetBrandArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetClientArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetIdentitiesArgs = {
  platformId: Scalars['String']['input'];
};


export type QueryGetOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOrganizationsArgs = {
  parentOrganizationId?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['String']['input'];
};


export type QueryGetPlatformMemberArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPlatformMembersArgs = {
  identityId?: InputMaybe<Scalars['String']['input']>;
  relation?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTenantArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTenantMemberArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTenantMembersArgs = {
  identityId?: InputMaybe<Scalars['String']['input']>;
  relation?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['String']['input'];
};


export type QueryGetTenantsArgs = {
  platformId: Scalars['String']['input'];
};


export type QueryGetUnitArgs = {
  id: Scalars['String']['input'];
};

export type StatusObject = {
  __typename?: 'StatusObject';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type TenantMemberObject = {
  __typename?: 'TenantMemberObject';
  id?: Maybe<Scalars['String']['output']>;
  identityId?: Maybe<Scalars['String']['output']>;
  relation?: Maybe<Scalars['String']['output']>;
  tenantId?: Maybe<Scalars['String']['output']>;
};

export type TenantObject = {
  __typename?: 'TenantObject';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type UnitObject = {
  __typename?: 'UnitObject';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type UpdateBrandInput = {
  brandId: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  categoryId: Scalars['String']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategoryId?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateOrganizationInput = {
  parentOrganizationId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUnitInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  unitId: Scalars['String']['input'];
};

export type Join__Graph =
  | 'ATTACHMENT'
  | 'IDENTITY_SERVICE'
  | 'ISSUES_SERVICE'
  | 'PLATFORM_SERVICE'
  | 'PRODUCT_SERVICE';

export type Link__Purpose =
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  | 'EXECUTION'
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  | 'SECURITY';
