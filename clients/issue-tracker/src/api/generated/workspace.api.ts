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
          url: `/api/v1/projects/${queryArg.id}/activities`,
        }),
        providesTags: ["issue"],
      }),
      createWorkspace: build.mutation<
        CreateWorkspaceApiResponse,
        CreateWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/workspaces`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getAllWorkspaces: build.query<
        GetAllWorkspacesApiResponse,
        GetAllWorkspacesApiArg
      >({
        query: () => ({ url: `/api/v1/workspaces` }),
        providesTags: ["workspace"],
      }),
      createWorkspaceInvite: build.mutation<
        CreateWorkspaceInviteApiResponse,
        CreateWorkspaceInviteApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/workspaces/${queryArg.id}/invite`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getWorkspaceRoleList: build.query<
        GetWorkspaceRoleListApiResponse,
        GetWorkspaceRoleListApiArg
      >({
        query: () => ({ url: `/api/v1/workspaces/role` }),
        providesTags: ["workspace"],
      }),
      getWorkspace: build.query<GetWorkspaceApiResponse, GetWorkspaceApiArg>({
        query: (queryArg) => ({ url: `/api/v1/workspaces/${queryArg.id}` }),
        providesTags: ["workspace"],
      }),
      updateWorkspace: build.mutation<
        UpdateWorkspaceApiResponse,
        UpdateWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/workspaces/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getWorkspaceMembers: build.query<
        GetWorkspaceMembersApiResponse,
        GetWorkspaceMembersApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/workspaces/${queryArg.id}/members`,
        }),
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
  id: string;
};
export type CreateWorkspaceApiResponse = /** status 201 Workspace created */ {
  id: string;
};
export type CreateWorkspaceApiArg = {
  /** Fields used to create a workspace */
  body: {
    /** A name for your workspace */
    name: string;
    /** A description for your workspace */
    description?: string;
  };
};
export type GetAllWorkspacesApiResponse = /** status 200 All workspaces */ {
  rows: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
  }[];
  rowCount: number;
};
export type GetAllWorkspacesApiArg = void;
export type CreateWorkspaceInviteApiResponse =
  /** status 201 Workspace member created and invite is sent */ string;
export type CreateWorkspaceInviteApiArg = {
  id: string;
  body: {
    email: string;
    workspaceRole: string;
  };
};
export type GetWorkspaceRoleListApiResponse =
  /** status 200 Get workspace role list */ {
    rows: string[];
    rowCount: number;
  };
export type GetWorkspaceRoleListApiArg = void;
export type GetWorkspaceApiResponse = /** status 200 Returns the workspace */ {
  id: string;
  name: string;
  createdAt?: string;
  description?: string;
};
export type GetWorkspaceApiArg = {
  id: string;
};
export type UpdateWorkspaceApiResponse =
  /** status 200 Workspace updated successfully */ string;
export type UpdateWorkspaceApiArg = {
  id: string;
  body: {
    name: string;
    description?: string;
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
      email?: string;
      user?: {
        createdAt?: string;
        updatedAt?: string;
        deletedAt?: string;
        version?: number;
        id: string;
        email: string;
        defaultWorkspaceId: string;
        emailVerificationStatus?: string;
        displayName: string;
        photoUrl?: string;
      };
    }[];
    filteredRowCount?: number;
  };
export type GetWorkspaceMembersApiArg = {
  id: string;
};
export type ErrorSchema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export const {
  useGetProjectActivityListQuery,
  useLazyGetProjectActivityListQuery,
  useCreateWorkspaceMutation,
  useGetAllWorkspacesQuery,
  useLazyGetAllWorkspacesQuery,
  useCreateWorkspaceInviteMutation,
  useGetWorkspaceRoleListQuery,
  useLazyGetWorkspaceRoleListQuery,
  useGetWorkspaceQuery,
  useLazyGetWorkspaceQuery,
  useUpdateWorkspaceMutation,
  useGetWorkspaceMembersQuery,
  useLazyGetWorkspaceMembersQuery,
} = injectedRtkApi;
