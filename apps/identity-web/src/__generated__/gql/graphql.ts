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
  DateTimeISO: { input: unknown; output: unknown; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: unknown; output: unknown; }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: { input: unknown; output: unknown; }
  join__FieldSet: { input: unknown; output: unknown; }
  link__Import: { input: unknown; output: unknown; }
};

export type FileOutput = {
  __typename?: 'FileOutput';
  bucket?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  thumbnailLink?: Maybe<Scalars['String']['output']>;
};

export type HelloXyz = {
  __typename?: 'HelloXYZ';
  message?: Maybe<Scalars['String']['output']>;
  message2?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteAttachment?: Maybe<Scalars['String']['output']>;
  hello?: Maybe<Scalars['String']['output']>;
};


export type MutationDeleteAttachmentArgs = {
  id: Scalars['String']['input'];
};

export type PaginatedFileOutput = {
  __typename?: 'PaginatedFileOutput';
  rowCount?: Maybe<Scalars['Float']['output']>;
  rows?: Maybe<Array<FileOutput>>;
};

export type Query = {
  __typename?: 'Query';
  findFiles?: Maybe<PaginatedFileOutput>;
  hello?: Maybe<HelloXyz>;
  hello2?: Maybe<Scalars['String']['output']>;
};


export type QueryFindFilesArgs = {
  issueId: Scalars['String']['input'];
};

export type Join__Graph =
  | 'ATTACHMENT'
  | 'IDENTITY_SERVICE';

export type Link__Purpose =
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  | 'EXECUTION'
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  | 'SECURITY';
