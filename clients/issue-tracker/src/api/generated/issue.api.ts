import { apiSlice as api } from "../issue-tracker.config";
export const addTagTypes = ["attachment", "issue", "comment"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createIssueAttachment: build.mutation<
        CreateIssueAttachmentApiResponse,
        CreateIssueAttachmentApiArg
      >({
        query: (queryArg) => ({
          url: `/attachments/issues/${queryArg.id}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["attachment"],
      }),
      getIssueAttachmentList: build.query<
        GetIssueAttachmentListApiResponse,
        GetIssueAttachmentListApiArg
      >({
        query: (queryArg) => ({ url: `/attachments/issues/${queryArg.id}` }),
        providesTags: ["attachment"],
      }),
      getIssueList: build.query<GetIssueListApiResponse, GetIssueListApiArg>({
        query: (queryArg) => ({
          url: `/issue-tracker/issues`,
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
          url: `/issue-tracker/issues`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
      getIssueStatusList: build.query<
        GetIssueStatusListApiResponse,
        GetIssueStatusListApiArg
      >({
        query: () => ({ url: `/issue-tracker/issues/status` }),
        providesTags: ["issue"],
      }),
      getIssuePriorityList: build.query<
        GetIssuePriorityListApiResponse,
        GetIssuePriorityListApiArg
      >({
        query: () => ({ url: `/issue-tracker/issues/priority` }),
        providesTags: ["issue"],
      }),
      getIssue: build.query<GetIssueApiResponse, GetIssueApiArg>({
        query: (queryArg) => ({ url: `/issue-tracker/issues/${queryArg.id}` }),
        providesTags: ["issue"],
      }),
      updateIssue: build.mutation<UpdateIssueApiResponse, UpdateIssueApiArg>({
        query: (queryArg) => ({
          url: `/issue-tracker/issues/${queryArg.id}`,
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
          url: `/issue-tracker/issues/${queryArg.id}/status`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
      updateIssueResolution: build.mutation<
        UpdateIssueResolutionApiResponse,
        UpdateIssueResolutionApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/issues/${queryArg.id}/resolution`,
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
          url: `/issue-tracker/issues/${queryArg.id}/comments`,
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
          url: `/issue-tracker/issues/${queryArg.id}/comments`,
        }),
        providesTags: ["issue"],
      }),
      deleteIssueComment: build.mutation<
        DeleteIssueCommentApiResponse,
        DeleteIssueCommentApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/issues/${queryArg.id}/comments/${queryArg.commentId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["issue", "comment"],
      }),
      getIssueTaskList: build.query<
        GetIssueTaskListApiResponse,
        GetIssueTaskListApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/issues/${queryArg.id}/tasks`,
        }),
        providesTags: ["issue"],
      }),
      createIssueTask: build.mutation<
        CreateIssueTaskApiResponse,
        CreateIssueTaskApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/issues/${queryArg.id}/tasks`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
      updateIssueTask: build.mutation<
        UpdateIssueTaskApiResponse,
        UpdateIssueTaskApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/issues/${queryArg.id}/tasks/${queryArg.taskId}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["issue"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type CreateIssueAttachmentApiResponse =
  /** status 201 Created a new issue attachment */ void;
export type CreateIssueAttachmentApiArg = {
  /** The numeric Id of the issue */
  id?: string;
  body: string;
};
export type GetIssueAttachmentListApiResponse =
  /** status 200 List of issue attachments */ {
    rows: any;
    filteredRowCount?: number;
  };
export type GetIssueAttachmentListApiArg = {
  /** The numeric Id of the issue */
  id?: string;
};
export type GetIssueListApiResponse = /** status 200 A list of issues */ {
  rows: {
    assignees: {
      id: string;
      user: {
        displayName: string;
        id: string;
      };
    }[];
    createdAt: string;
    createdById?: string;
    deletedAt: string;
    description: string;
    dueDate: string | string;
    id: string;
    name: string;
    priority: string;
    priorityList: string[];
    project: {
      id: string;
      name: string;
    };
    reporter: {
      id: string;
      displayName: string;
    };
    resolution: boolean;
  }[];
  filteredRowCount: number;
};
export type GetIssueListApiArg = {
  page?: string;
  pageSize?: string;
  sortBy?: string;
  sortOrder?: string;
  projectId?: string;
};
export type CreateIssueApiResponse =
  /** status 201 Issue created successfully */ void;
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
    reporter?: {
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
  /** status 200 Returns the issue if it exists */ {
    createdAt?: string | string;
    createdById?: string;
    deletedAt?: string | string;
    description?: string;
    dueDate?: string | string;
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
    updatedAt?: string | string;
  };
export type GetIssueApiArg = {
  /** Numeric id of the issue to get */
  id?: string;
};
export type UpdateIssueApiResponse = /** status 200 Updates the issue */ void;
export type UpdateIssueApiArg = {
  /** Numeric id of the issue to get */
  id?: string;
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
    reportedId?: {
      id: string;
      name: string;
    };
    dueDate?: string | string;
  };
};
export type UpdateIssueStatusApiResponse =
  /** status 200 Update issue status successfully */ void;
export type UpdateIssueStatusApiArg = {
  /** Numeric id of the issue to get */
  id?: string;
  body: {
    status?: string;
  };
};
export type UpdateIssueResolutionApiResponse =
  /** status 200 Update issue resolution successfully */ void;
export type UpdateIssueResolutionApiArg = {
  /** Numeric id of the issue to get */
  id?: string;
  body: {
    resolution?: boolean;
  };
};
export type CreateIssueCommentApiResponse =
  /** status 201 The comment has been created successfully */ void;
export type CreateIssueCommentApiArg = {
  /** Numeric id of the issue in which the comment will be created */
  id?: string;
  body: {
    description?: string;
  };
};
export type GetIssueCommentListApiResponse =
  /** status 200 List of all the issue comments */ {
    rows: any;
    filteredRowCount: number;
  };
export type GetIssueCommentListApiArg = {
  /** Numeric id of the issue who's comments will be returned */
  id?: string;
};
export type DeleteIssueCommentApiResponse =
  /** status 201 The comment has been created successfully */ void;
export type DeleteIssueCommentApiArg = {
  /** Numeric id of the issue in which the comment will be created */
  id?: string;
  /** Numeric id of the comment */
  commentId?: string;
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
  /** status 201 Issue task created successfully */ void;
export type CreateIssueTaskApiArg = {
  id?: string;
  body: {
    description: string;
    completed?: boolean;
    dueDate?: string | string;
  };
};
export type UpdateIssueTaskApiResponse =
  /** status 201 Issue task created successfully */ void;
export type UpdateIssueTaskApiArg = {
  /** Numeric id of the issue */
  id?: string;
  /** Numeric id of the task */
  taskId?: string;
  body: {
    description: string;
    completed?: boolean;
    dueDate?: string | string;
  };
};
export const {
  useCreateIssueAttachmentMutation,
  useGetIssueAttachmentListQuery,
  useGetIssueListQuery,
  useCreateIssueMutation,
  useGetIssueStatusListQuery,
  useGetIssuePriorityListQuery,
  useGetIssueQuery,
  useUpdateIssueMutation,
  useUpdateIssueStatusMutation,
  useUpdateIssueResolutionMutation,
  useCreateIssueCommentMutation,
  useGetIssueCommentListQuery,
  useDeleteIssueCommentMutation,
  useGetIssueTaskListQuery,
  useCreateIssueTaskMutation,
  useUpdateIssueTaskMutation,
} = injectedRtkApi;
