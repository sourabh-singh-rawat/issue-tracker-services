import { apiSlice as api } from "../api.config";
export const addTagTypes = ["identity"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      signup: build.mutation<SignupApiResponse, SignupApiArg>({
        query: (queryArg) => ({
          url: `/identity/signup`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["identity"],
      }),
      login: build.mutation<LoginApiResponse, LoginApiArg>({
        query: (queryArg) => ({
          url: `/identity/login`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["identity"],
      }),
      getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
      >({
        query: () => ({ url: `/identity/users/me` }),
        providesTags: ["identity"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type SignupApiResponse =
  /** status 201 New user + accessToken + refreshToken */ undefined;
export type SignupApiArg = {
  body: {
    email: Email;
    password: Password;
    displayName: string;
  };
};
export type LoginApiResponse =
  /** status 200 accessToken and refreshTokens are successfully generated. */ undefined;
export type LoginApiArg = {
  body: {
    email?: string;
    password?: string;
  };
};
export type GetCurrentUserApiResponse = unknown;
export type GetCurrentUserApiArg = void;
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export type Email = string;
export type Password = string;
export const { useSignupMutation, useLoginMutation, useGetCurrentUserQuery } =
  injectedRtkApi;
