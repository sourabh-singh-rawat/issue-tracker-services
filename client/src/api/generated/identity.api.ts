import { apiSlice as api } from "../api.config";
export const addTagTypes = ["identity"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      register: build.mutation<RegisterApiResponse, RegisterApiArg>({
        query: (queryArg) => ({
          url: `/identity/signup`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["identity"],
      }),
      updateUserEmail: build.mutation<
        UpdateUserEmailApiResponse,
        UpdateUserEmailApiArg
      >({
        query: (queryArg) => ({
          url: `/identity/users/${queryArg.id}/email`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["identity"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type RegisterApiResponse =
  /** status 201 New user + accessToken + refreshToken */ undefined;
export type RegisterApiArg = {
  body: {
    email?: string;
    password?: string;
    displayName?: string;
  };
};
export type UpdateUserEmailApiResponse = unknown;
export type UpdateUserEmailApiArg = {
  /** Id of the user */
  id: string;
  body: {
    email: string;
  };
};
export type Error = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export const { useRegisterMutation, useUpdateUserEmailMutation } =
  injectedRtkApi;
