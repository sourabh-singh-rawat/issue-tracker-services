import { apiSlice as api } from "../issue-tracker.config";
export const addTagTypes = ["project"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createProject: build.mutation<
        CreateProjectApiResponse,
        CreateProjectApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/projects`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["project"],
      }),
      getProjectList: build.query<
        GetProjectListApiResponse,
        GetProjectListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/projects`,
          params: {
            page: queryArg.page,
            pageSize: queryArg.pageSize,
            sortBy: queryArg.sortBy,
            sortOrder: queryArg.sortOrder,
          },
        }),
        providesTags: ["project"],
      }),
      getProject: build.query<GetProjectApiResponse, GetProjectApiArg>({
        query: (queryArg) => ({ url: `/api/v1/projects/${queryArg.id}` }),
        providesTags: ["project"],
      }),
      updateProject: build.mutation<
        UpdateProjectApiResponse,
        UpdateProjectApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/projects/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["project"],
      }),
      getProjectStatusList: build.query<
        GetProjectStatusListApiResponse,
        GetProjectStatusListApiArg
      >({
        query: () => ({ url: `/api/v1/projects/status` }),
        providesTags: ["project"],
      }),
      getProjectMembers: build.query<
        GetProjectMembersApiResponse,
        GetProjectMembersApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/projects/${queryArg.id}/members`,
        }),
        providesTags: ["project"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type CreateProjectApiResponse =
  /** status 201 Project created successfully */ {
    rows: string;
  };
export type CreateProjectApiArg = {
  body: {
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    status: string;
  };
};
export type GetProjectListApiResponse =
  /** status 200 All the projects created by a user or associated with them */ {
    rows?: {
      id?: string;
      name?: string;
      status?: string;
      statuses?: string[];
      inviteStatus?: string;
      members?: {
        user?: {
          id?: string;
          displayName?: string;
        };
      }[];
      ownerUserId?: string;
      startDate?: string;
      endDate?: string;
    }[];
    rowCount?: number;
  };
export type GetProjectListApiArg = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
};
export type GetProjectApiResponse = /** status 200 Default Response */ {
  createdAt: string;
  deletedAt: string;
  description: string;
  endDate: string;
  id: string;
  name: string;
  ownerUserId: string;
  startDate: string;
  status: string;
  updatedAt: string;
  version: number;
  workspaceId: string;
};
export type GetProjectApiArg = {
  id: string;
};
export type UpdateProjectApiResponse =
  /** status 200 Project updated successfully */ string;
export type UpdateProjectApiArg = {
  id: string;
  body: {
    name?: string;
    description?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  };
};
export type GetProjectStatusListApiResponse =
  /** status 200 Get project status list */ {
    rows: any;
    rowCount: number;
  };
export type GetProjectStatusListApiArg = void;
export type GetProjectMembersApiResponse =
  /** status 200 Get all project members */ {
    rows: {
      id?: string;
      user: {
        id: string;
        displayName: string;
        email: string;
      };
      createdAt: string;
      role: string;
    }[];
    rowCount: number;
  };
export type GetProjectMembersApiArg = {
  id: string;
};
export type ErrorSchema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export const {
  useCreateProjectMutation,
  useGetProjectListQuery,
  useLazyGetProjectListQuery,
  useGetProjectQuery,
  useLazyGetProjectQuery,
  useUpdateProjectMutation,
  useGetProjectStatusListQuery,
  useLazyGetProjectStatusListQuery,
  useGetProjectMembersQuery,
  useLazyGetProjectMembersQuery,
} = injectedRtkApi;
