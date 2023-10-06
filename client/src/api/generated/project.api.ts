import { apiSlice as api } from "../api.config";
export const addTagTypes = ["projects"] as const;
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
          url: `/projects`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["projects"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type CreateProjectApiResponse =
  /** status 201 Project created successfully */ undefined;
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
export const { useCreateProjectMutation } = injectedRtkApi;
