import { apiSlice as api } from "../issue-tracker.config";
export const addTagTypes = ["issue", "workspace"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProjectActivityList: build.query<
        GetProjectActivityListApiResponse,
        GetProjectActivityListApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/activities/projects/${queryArg.id}`,
        }),
        providesTags: ["issue"],
      }),
      getAllWorkspaces: build.query<
        GetAllWorkspacesApiResponse,
        GetAllWorkspacesApiArg
      >({
        query: () => ({ url: `/issue-tracker/workspaces` }),
        providesTags: ["workspace"],
      }),
      createWorkspace: build.mutation<
        CreateWorkspaceApiResponse,
        CreateWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/workspaces`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getWorkspace: build.query<GetWorkspaceApiResponse, GetWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/issue-tracker/workspaces/${queryArg.id}`,
        }),
        providesTags: ["workspace"],
      }),
      updateWorkspace: build.mutation<
        UpdateWorkspaceApiResponse,
        UpdateWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/workspaces/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      createWorkspaceInvite: build.mutation<
        CreateWorkspaceInviteApiResponse,
        CreateWorkspaceInviteApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/workspaces/invite`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getWorkspaceMembers: build.query<
        GetWorkspaceMembersApiResponse,
        GetWorkspaceMembersApiArg
      >({
        query: (queryArg) => ({
          url: `/issue-tracker/workspaces/${queryArg.id}/members`,
        }),
        providesTags: ["workspace"],
      }),
      getWorkspaceRoleList: build.query<
        GetWorkspaceRoleListApiResponse,
        GetWorkspaceRoleListApiArg
      >({
        query: () => ({ url: `/issue-tracker/workspaces/role` }),
        providesTags: ["workspace"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GetProjectActivityListApiResponse =
  /** status 200 Get project activities for a given project */ {
    rows: string[];
    rowCount: number;
  };
export type GetProjectActivityListApiArg = {
  id?: string;
};
export type GetAllWorkspacesApiResponse = /** status 200 all workspaces */ {
  rows: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
  }[];
  rowCount: number;
};
export type GetAllWorkspacesApiArg = void;
export type CreateWorkspaceApiResponse = /** status 201 Workspace created */ {
  id: string;
};
export type CreateWorkspaceApiArg = {
  /** Fields used to create a workspace */
  body: {
    /** A name for your workspace. */
    name: string;
    /** A description for your workspace. */
    description?: string;
  };
};
export type GetWorkspaceApiResponse = /** status 200 Returns the workspace */ {
  rows?: {
    id: string;
    name: string;
    createdAt?: string;
    description?: string;
  };
};
export type GetWorkspaceApiArg = {
  /** Numeric id of the workspace to get */
  id: string;
};
export type UpdateWorkspaceApiResponse =
  /** status 200 Workspace updated successfully */ void;
export type UpdateWorkspaceApiArg = {
  /** Numeric id of the workspace to update */
  id?: string;
  /** Fields used to update workspace */
  body: {
    name: string;
    description?: string;
  };
};
export type CreateWorkspaceInviteApiResponse =
  /** status 201 Workspace member created */ void;
export type CreateWorkspaceInviteApiArg = {
  /** Fields used to create a new workspace member invite */
  body: {
    email: string;
    workspaceRole: string;
  };
};
export type GetWorkspaceMembersApiResponse =
  /** status 200 All the workspace members */ {
    rows?: {
      id?: string;
      userId?: string;
      workspaceId?: string;
      status?: string;
      role?: string;
    }[];
    filteredRowCount?: number;
  };
export type GetWorkspaceMembersApiArg = {
  /** Numeric id of the workspace */
  id?: string;
};
export type GetWorkspaceRoleListApiResponse =
  /** status 200 Get workspace roles list */ {
    rows: string[];
    rowCount: number;
  };
export type GetWorkspaceRoleListApiArg = void;
export const {
  useGetProjectActivityListQuery,
  useLazyGetProjectActivityListQuery,
  useGetAllWorkspacesQuery,
  useLazyGetAllWorkspacesQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceQuery,
  useLazyGetWorkspaceQuery,
  useUpdateWorkspaceMutation,
  useCreateWorkspaceInviteMutation,
  useGetWorkspaceMembersQuery,
  useLazyGetWorkspaceMembersQuery,
  useGetWorkspaceRoleListQuery,
  useLazyGetWorkspaceRoleListQuery,
} = injectedRtkApi;
