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
      startDate?: StartDate;
      endDate?: EndDate;
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
    startDate?: string;
    endDate?: string;
    status: string;
  };
};
export type GetProjectStatusListApiResponse =
  /** status 200 Get project status list */ {
    rows?: string[];
    rowCount: number;
  };
export type GetProjectStatusListApiArg = void;
export type Name = string;
export type Description = string;
export type Status = string;
export type StartDate = string;
export type EndDate = string;
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
} = injectedRtkApi;
