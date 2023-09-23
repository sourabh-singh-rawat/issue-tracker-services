import { apiSlice as api } from "../api.config";
export const addTagTypes = ["user"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      registerUser: build.mutation<RegisterUserApiResponse, RegisterUserApiArg>(
        {
          query: (queryArg) => ({
            url: `/users/register`,
            method: "POST",
            body: queryArg.body,
          }),
          invalidatesTags: ["user"],
        },
      ),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type RegisterUserApiResponse =
  /** status 201 User successfully registered */ undefined;
export type RegisterUserApiArg = {
  body: {
    email: string;
    password: string;
    displayName: string;
  };
};
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export const { useRegisterUserMutation } = injectedRtkApi;