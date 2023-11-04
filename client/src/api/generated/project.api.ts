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
      name?: Name;
      description?: Description;
      status?: Status;
      ownerUserId?: string;
      workspaceId?: string;
      startDate?: DueDate;
      endDate?: DueDate;
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
    name: Name;
    description?: Description;
    startDate?: DueDate;
    endDate?: DueDate;
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
  /** status 200 Projects updated successfully */ undefined;
export type GetProjectApiArg = {
  /** Numeric id of the project to update */
  id?: string;
};
export type UpdateProjectApiResponse =
  /** status 200 Projects updated successfully */ undefined;
export type UpdateProjectApiArg = {
  /** Numeric id of the project to update */
  id: string;
  body: {
    name?: Name;
    description?: Description;
    status?: Status;
    startDate?: DueDate;
    endDate?: DueDate;
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
    rows: string[];
    rowCount: number;
  };
export type GetProjectMembersApiArg = {
  /** Numeric id of the project */
  id?: string;
};
export type CreateProjectInviteApiResponse =
  /** status 201 Invite created successfully */ undefined;
export type CreateProjectInviteApiArg = {
  /** Numeric id of the project */
  id?: string;
  /** Fields used for creating a new project member */
  body: {
    userId: string;
    role: string;
  };
};
export type Name = string;
export type Description = string;
export type Status = string;
export type DueDate = string | string;
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
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
