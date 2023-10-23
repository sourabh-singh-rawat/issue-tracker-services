import { apiSlice as api } from "../api.config";
export const addTagTypes = ["issue"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getIssueList: build.query<GetIssueListApiResponse, GetIssueListApiArg>({
        query: (queryArg) => ({
          url: `/issues`,
          params: {
            page: queryArg.page,
            pageSize: queryArg.pageSize,
            sortBy: queryArg.sortBy,
            sortOrder: queryArg.sortOrder,
            projectId: queryArg.projectId,
          },
        }),
        providesTags: ["issue"],
      }),
      createIssue: build.mutation<CreateIssueApiResponse, CreateIssueApiArg>({
        query: (queryArg) => ({
          url: `/issues`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
      getIssueStatusList: build.query<
        GetIssueStatusListApiResponse,
        GetIssueStatusListApiArg
      >({
        query: () => ({ url: `/issues/status` }),
        providesTags: ["issue"],
      }),
      getIssuePriorityList: build.query<
        GetIssuePriorityListApiResponse,
        GetIssuePriorityListApiArg
      >({
        query: () => ({ url: `/issues/priority` }),
        providesTags: ["issue"],
      }),
      getIssue: build.query<GetIssueApiResponse, GetIssueApiArg>({
        query: (queryArg) => ({ url: `/issues/${queryArg.id}` }),
        providesTags: ["issue"],
      }),
      createIssueComment: build.mutation<
        CreateIssueCommentApiResponse,
        CreateIssueCommentApiArg
      >({
        query: (queryArg) => ({
          url: `/issues/${queryArg.id}/comments`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
      getIssueCommentList: build.query<
        GetIssueCommentListApiResponse,
        GetIssueCommentListApiArg
      >({
        query: (queryArg) => ({ url: `/issues/${queryArg.id}/comments` }),
        providesTags: ["issue"],
      }),
      getIssueTaskList: build.query<
        GetIssueTaskListApiResponse,
        GetIssueTaskListApiArg
      >({
        query: (queryArg) => ({ url: `/issues/${queryArg.id}/tasks` }),
        providesTags: ["issue"],
      }),
      createIssueTask: build.mutation<
        CreateIssueTaskApiResponse,
        CreateIssueTaskApiArg
      >({
        query: (queryArg) => ({
          url: `/issues/${queryArg.id}/tasks`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GetIssueListApiResponse =
  /** status 200 A list of issues */ undefined;
export type GetIssueListApiArg = {
  page?: string;
  pageSize?: string;
  sortBy?: string;
  sortOrder?: string;
  projectId?: string;
};
export type CreateIssueApiResponse =
  /** status 201 Issue created successfully */ undefined;
export type CreateIssueApiArg = {
  body: {
    name: string;
    description?: string;
    status?: string;
    priority?: string;
    resolution?: boolean;
    projectId?: string;
    assignees: {
      id: string;
      name: string;
    }[];
    reporterId?: {
      id: string;
      name: string;
    };
    dueDate?: string | string;
  };
};
export type GetIssueStatusListApiResponse =
  /** status 200 Get issue status list */ {
    rows: string[];
    rowCount: number;
  };
export type GetIssueStatusListApiArg = void;
export type GetIssuePriorityListApiResponse =
  /** status 200 Get issue priority list */ {
    rows: string[];
    rowCount: number;
  };
export type GetIssuePriorityListApiArg = void;
export type GetIssueApiResponse =
  /** status 200 Returns the issue if it exists */ undefined;
export type GetIssueApiArg = {
  /** Numeric id of the issue to get */
  id?: string;
};
export type CreateIssueCommentApiResponse =
  /** status 201 The comment has been created successfully */ undefined;
export type CreateIssueCommentApiArg = {
  /** Numeric id of the issue in which the comment will be created */
  id?: string;
  body: {
    description?: Description;
  };
};
export type GetIssueCommentListApiResponse =
  /** status 200 List of all the issue comments */ undefined;
export type GetIssueCommentListApiArg = {
  /** Numeric id of the issue who's comments will be returned */
  id?: string;
};
export type GetIssueTaskListApiResponse =
  /** status 200 Issue task created successfully */ {
    rows: any;
    rowCount: number;
  };
export type GetIssueTaskListApiArg = {
  id?: string;
};
export type CreateIssueTaskApiResponse =
  /** status 201 Issue task created successfully */ undefined;
export type CreateIssueTaskApiArg = {
  id?: string;
  body: {
    description: Description;
    completed?: boolean;
    dueDate?: DueDate;
  };
};
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export type Description = string;
export type DueDate = string | string;
export const {
  useGetIssueListQuery,
  useCreateIssueMutation,
  useGetIssueStatusListQuery,
  useGetIssuePriorityListQuery,
  useGetIssueQuery,
  useCreateIssueCommentMutation,
  useGetIssueCommentListQuery,
  useGetIssueTaskListQuery,
  useCreateIssueTaskMutation,
} = injectedRtkApi;
