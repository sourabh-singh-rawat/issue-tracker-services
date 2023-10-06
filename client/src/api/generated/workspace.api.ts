import { apiSlice as api } from "../api.config";
export const addTagTypes = ["workspace"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GetAllWorkspacesApiResponse = /** status 201 all workspaces */ {
  data: {
    id: string;
    name: string;
    createdAt: string;
  }[];
  dataCount: number;
};
export type GetAllWorkspacesApiArg = void;
export type CreateWorkspaceApiResponse = /** status 201 Workspace created */ {
  id: string;
};
export type CreateWorkspaceApiArg = {
  /** Fields used to create a workspace */
  body: {
    name: Name;
    description?: Description;
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
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export type Name = string;
export type Description = string;
export const {
  useGetAllWorkspacesQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceQuery,
} = injectedRtkApi;
