import { apiSlice as api } from "../api.config";
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
        query: (queryArg) => ({ url: `/activities/projects/${queryArg.id}` }),
        providesTags: ["issue"],
      }),
      getWorkspaceMemberList: build.query<
        GetWorkspaceMemberListApiResponse,
        GetWorkspaceMemberListApiArg
      >({
        query: (queryArg) => ({
          url: `/projects/${queryArg.id}/workspace-members`,
        }),
        providesTags: ["workspace"],
      }),
      getAllWorkspaces: build.query<
        GetAllWorkspacesApiResponse,
        GetAllWorkspacesApiArg
      >({
        query: () => ({ url: `/workspaces` }),
        providesTags: ["workspace"],
      }),
      createWorkspace: build.mutation<
        CreateWorkspaceApiResponse,
        CreateWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/workspaces`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getWorkspace: build.query<GetWorkspaceApiResponse, GetWorkspaceApiArg>({
        query: (queryArg) => ({ url: `/workspaces/${queryArg.id}` }),
        providesTags: ["workspace"],
      }),
      createWorkspaceInvite: build.mutation<
        CreateWorkspaceInviteApiResponse,
        CreateWorkspaceInviteApiArg
      >({
        query: (queryArg) => ({
          url: `/workspaces/invite`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["workspace"],
      }),
      getWorkspaceRoleList: build.query<
        GetWorkspaceRoleListApiResponse,
        GetWorkspaceRoleListApiArg
      >({
        query: () => ({ url: `/workspaces/role` }),
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
export type GetWorkspaceMemberListApiResponse =
  /** status 200 Returns the workspace members */ {
    rows?: {
      id?: string;
      displayName?: string;
      createdAt?: string;
    };
  };
export type GetWorkspaceMemberListApiArg = {
  /** Numeric id of the workspace */
  id: string;
};
export type GetAllWorkspacesApiResponse = /** status 200 all workspaces */ {
  rows: {
    id: string;
    name: string;
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
    name: string;
    description?: string;
  };
};
export type GetWorkspaceApiResponse = /** status 200 Returns the workspace */ {
  data?: {
    id?: string;
    name?: string;
    createdAt?: string;
  };
};
export type GetWorkspaceApiArg = {
  /** Numeric id of the workspace to get */
  id: string;
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
export type GetWorkspaceRoleListApiResponse =
  /** status 200 Get workspace roles list */ {
    rows: string[];
    rowCount: number;
  };
export type GetWorkspaceRoleListApiArg = void;
export const {
  useGetProjectActivityListQuery,
  useGetWorkspaceMemberListQuery,
  useGetAllWorkspacesQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceQuery,
  useCreateWorkspaceInviteMutation,
  useGetWorkspaceRoleListQuery,
} = injectedRtkApi;
