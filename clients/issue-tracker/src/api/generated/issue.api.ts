import { apiSlice as api } from "../issue-tracker.config";
export const addTagTypes = ["issue", "comment"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createIssue: build.mutation<CreateIssueApiResponse, CreateIssueApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/issues`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
      getIssueList: build.query<GetIssueListApiResponse, GetIssueListApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/issues`,
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
      getIssuePriorityList: build.query<
        GetIssuePriorityListApiResponse,
        GetIssuePriorityListApiArg
      >({
        query: () => ({ url: `/api/v1/issues/priority` }),
      }),
      getIssueStatusList: build.query<
        GetIssueStatusListApiResponse,
        GetIssueStatusListApiArg
      >({
        query: () => ({ url: `/api/v1/issues/status` }),
      }),
      getIssue: build.query<GetIssueApiResponse, GetIssueApiArg>({
        query: (queryArg) => ({ url: `/api/v1/issues/${queryArg.id}` }),
        providesTags: ["issue"],
      }),
      updateIssue: build.mutation<UpdateIssueApiResponse, UpdateIssueApiArg>({
        query: (queryArg) => ({
          url: `/api/v1/issues/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
      updateIssueStatus: build.mutation<
        UpdateIssueStatusApiResponse,
        UpdateIssueStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/issues/${queryArg.id}/status`,
          method: "PATCH",
          body: queryArg.body,
        }),
      }),
      updateIssueResolution: build.mutation<
        UpdateIssueResolutionApiResponse,
        UpdateIssueResolutionApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/issues/${queryArg.id}/resolution`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
      createIssueComment: build.mutation<
        CreateIssueCommentApiResponse,
        CreateIssueCommentApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/issues/${queryArg.id}/comments`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue", "comment"],
      }),
      getIssueCommentList: build.query<
        GetIssueCommentListApiResponse,
        GetIssueCommentListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/issues/${queryArg.id}/comments`,
        }),
      }),
      deleteIssueComment: build.mutation<
        DeleteIssueCommentApiResponse,
        DeleteIssueCommentApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/issues/${queryArg.id}/comments/${queryArg.commentId}`,
          method: "DELETE",
        }),
      }),
      createIssueTask: build.mutation<
        CreateIssueTaskApiResponse,
        CreateIssueTaskApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/issues/${queryArg.id}/tasks`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
      getIssueTaskList: build.query<
        GetIssueTaskListApiResponse,
        GetIssueTaskListApiArg
      >({
        query: () => ({ url: `/api/v1/issues/tasks` }),
        providesTags: ["issue"],
      }),
      updateIssueTask: build.mutation<
        UpdateIssueTaskApiResponse,
        UpdateIssueTaskApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/issues/${queryArg.id}/tasks/${queryArg.taskId}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type CreateIssueApiResponse =
  /** status 201 Issue created successfully */ string;
export type CreateIssueApiArg = {
  body: {
    name?: string;
    projectId?: string;
    status?: string;
    priority?: string;
    reporter?: {
      id: string;
      name: string;
      userId?: string;
      email: string;
      createdAt?: string;
      updatedAt?: string;
      role?: string;
    };
    assignees?: {
      id: string;
      name: string;
      userId?: string;
      email: string;
      createdAt?: string;
      updatedAt?: string;
      role?: string;
    }[];
    resolution?: boolean;
    dueDate?: string;
    id?: string;
    description?: string;
  };
};
export type GetIssueListApiResponse = unknown;
export type GetIssueListApiArg = {
  page?: string;
  pageSize?: string;
  sortBy?: string;
  sortOrder?: string;
  projectId?: string;
};
export type GetIssuePriorityListApiResponse =
  /** status 200 Get issue priority list */ {
    rows: string[];
    rowCount: string;
  };
export type GetIssuePriorityListApiArg = void;
export type GetIssueStatusListApiResponse =
  /** status 200 Get issues status list */ {
    rows: string[];
    rowCount: number;
  };
export type GetIssueStatusListApiArg = void;
export type GetIssueApiResponse =
  /** status 200 Returns the issue if it exists */ {
    createdAt?: string;
    createdById?: string;
    deletedAt?: string;
    description?: string;
    dueDate?: string;
    id?: string;
    name?: string;
    priority?: string;
    projectId?: string;
    project?: {
      id: string;
      name: string;
    };
    reporterId?: string;
    resolution?: boolean;
    status?: string;
    updatedAt?: string;
  };
export type GetIssueApiArg = {
  id: string;
};
export type UpdateIssueApiResponse = /** status 200 Update the issue */ object;
export type UpdateIssueApiArg = {
  id: string;
  body: {
    name?: string;
    description?: string;
    status?: string;
    priority?: string;
    resolution?: boolean;
    projectId?: string;
    assignees?: {
      id: string;
      name: string;
    }[];
    reporterId?: {
      id?: string;
      name?: string;
    };
    dueDate?: string;
  };
};
export type UpdateIssueStatusApiResponse =
  /** status 200 Update issue status successfully */ string;
export type UpdateIssueStatusApiArg = {
  id: string;
  body: {
    status?: string;
  };
};
export type UpdateIssueResolutionApiResponse =
  /** status 200 Update issue resolution successfully */ string;
export type UpdateIssueResolutionApiArg = {
  id: string;
  body: {
    resolution?: boolean;
  };
};
export type CreateIssueCommentApiResponse =
  /** status 201 The comment has been created successfully */ string;
export type CreateIssueCommentApiArg = {
  id: string;
  body: {
    description?: string;
  };
};
export type GetIssueCommentListApiResponse =
  /** status 200 Default Response */ {
    rows: any;
    filteredRowCount: number;
  };
export type GetIssueCommentListApiArg = {
  id: string;
};
export type DeleteIssueCommentApiResponse =
  /** status 201 The comment has been created successfully */ string;
export type DeleteIssueCommentApiArg = {
  id: string;
  commentId: string;
};
export type CreateIssueTaskApiResponse =
  /** status 201 Issue task created successfully */ string;
export type CreateIssueTaskApiArg = {
  id: string;
  body: {
    description: string;
    completed?: boolean;
    dueDate?: string;
  };
};
export type GetIssueTaskListApiResponse =
  /** status 200 Issue task created successfully */ {
    row: any;
    rowCount: number;
  };
export type GetIssueTaskListApiArg = void;
export type UpdateIssueTaskApiResponse =
  /** status 201 Issue task created successfully */ string;
export type UpdateIssueTaskApiArg = {
  id: string;
  taskId: string;
  body: {
    description: string;
    completed?: boolean;
    dueDate?: string;
  };
};
export const {
  useCreateIssueMutation,
  useGetIssueListQuery,
  useLazyGetIssueListQuery,
  useGetIssuePriorityListQuery,
  useLazyGetIssuePriorityListQuery,
  useGetIssueStatusListQuery,
  useLazyGetIssueStatusListQuery,
  useGetIssueQuery,
  useLazyGetIssueQuery,
  useUpdateIssueMutation,
  useUpdateIssueStatusMutation,
  useUpdateIssueResolutionMutation,
  useCreateIssueCommentMutation,
  useGetIssueCommentListQuery,
  useLazyGetIssueCommentListQuery,
  useDeleteIssueCommentMutation,
  useCreateIssueTaskMutation,
  useGetIssueTaskListQuery,
  useLazyGetIssueTaskListQuery,
  useUpdateIssueTaskMutation,
} = injectedRtkApi;
