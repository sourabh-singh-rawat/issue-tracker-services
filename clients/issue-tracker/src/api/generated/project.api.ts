import { apiSlice as api } from "../api.config";
export const addTagTypes = ["project"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProjectList: build.query<
        GetProjectListApiResponse,
        GetProjectListApiArg
      >({
        query: (queryArg) => ({
          url: `/projects`,
          params: {
            page: queryArg.page,
            pageSize: queryArg.pageSize,
            sortBy: queryArg.sortBy,
            sortOrder: queryArg.sortOrder,
          },
        }),
        providesTags: ["project"],
      }),
      createProject: build.mutation<
        CreateProjectApiResponse,
        CreateProjectApiArg
      >({
        query: (queryArg) => ({
          url: `/projects`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["project"],
      }),
      getProjectStatusList: build.query<
        GetProjectStatusListApiResponse,
        GetProjectStatusListApiArg
      >({
        query: () => ({ url: `/projects/status` }),
        providesTags: ["project"],
      }),
      getProject: build.query<GetProjectApiResponse, GetProjectApiArg>({
        query: (queryArg) => ({ url: `/projects/${queryArg.id}` }),
        providesTags: ["project"],
      }),
      updateProject: build.mutation<
        UpdateProjectApiResponse,
        UpdateProjectApiArg
      >({
        query: (queryArg) => ({
          url: `/projects/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["project"],
      }),
      getProjectRoleList: build.query<
        GetProjectRoleListApiResponse,
        GetProjectRoleListApiArg
      >({
        query: (queryArg) => ({ url: `/projects/${queryArg.id}/role` }),
        providesTags: ["project"],
      }),
      getProjectMembers: build.query<
        GetProjectMembersApiResponse,
        GetProjectMembersApiArg
      >({
        query: (queryArg) => ({ url: `/projects/${queryArg.id}/members` }),
        providesTags: ["project"],
      }),
      createProjectInvite: build.mutation<
        CreateProjectInviteApiResponse,
        CreateProjectInviteApiArg
      >({
        query: (queryArg) => ({
          url: `/projects/${queryArg.id}/members/invite`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["project"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GetProjectListApiResponse =
  /** status 200 All the projects created by a user or associated with them */ {
    rows?: {
      id?: string;
      name?: string;
      description?: string;
      status?: string;
      ownerUserId?: string;
      workspaceId?: string;
      startDate?: string | string;
      endDate?: string | string;
    }[];
    rowCount?: number;
  };
export type GetProjectListApiArg = {
  page?: string;
  pageSize?: string;
  sortBy?: string;
  sortOrder?: string;
};
export type CreateProjectApiResponse =
  /** status 201 Project created successfully */ {
    rows: string;
  };
export type CreateProjectApiArg = {
  /** Fields used for creating a new project */
  body: {
    name: string;
    description?: string;
    startDate?: string | string;
    endDate?: string | string;
    status: string;
  };
};
export type GetProjectStatusListApiResponse =
  /** status 200 Get project status list */ {
    rows: string[];
    rowCount: number;
  };
export type GetProjectStatusListApiArg = void;
export type GetProjectApiResponse =
  /** status 200 Projects updated successfully */ {
    createdAt: string | string;
    deletedAt: string | string;
    description: string;
    endDate: string | string;
    id: string;
    name: string;
    ownerUserId: string;
    startDate: string | string;
    status: string;
    updatedAt: string | string;
    version: number;
    workspaceId: string;
  };
export type GetProjectApiArg = {
  /** Numeric id of the project to update */
  id?: string;
};
export type UpdateProjectApiResponse =
  /** status 200 Projects updated successfully */ void;
export type UpdateProjectApiArg = {
  /** Numeric id of the project to update */
  id: string;
  body: {
    name?: string;
    description?: string;
    status?: string;
    startDate?: string | string;
    endDate?: string | string;
  };
};
export type GetProjectRoleListApiResponse =
  /** status 200 Get project roles list */ {
    rows: string[];
    rowCount: number;
  };
export type GetProjectRoleListApiArg = {
  id?: string;
};
export type GetProjectMembersApiResponse =
  /** status 200 Get all project members */ {
    rows: {
      user: {
        id: string;
        displayName: string;
        email: string;
      };
      createdAt: any;
      role: string;
    }[];
    rowCount: number;
  };
export type GetProjectMembersApiArg = {
  /** Numeric id of the project */
  id?: string;
};
export type CreateProjectInviteApiResponse =
  /** status 201 Invite created successfully */ void;
export type CreateProjectInviteApiArg = {
  /** Numeric id of the project */
  id?: string;
  /** Fields used for creating a new project member */
  body: {
    userId: string;
    role: string;
    workspaceId: string;
  };
};
export const {
  useGetProjectListQuery,
  useCreateProjectMutation,
  useGetProjectStatusListQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useGetProjectRoleListQuery,
  useGetProjectMembersQuery,
  useCreateProjectInviteMutation,
} = injectedRtkApi;
