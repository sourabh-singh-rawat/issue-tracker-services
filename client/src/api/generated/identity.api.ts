import { apiSlice as api } from "../api.config";
export const addTagTypes = ["identity"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
      >({
        query: () => ({ url: `/users/me` }),
        providesTags: ["identity"],
      }),
      generateTokens: build.mutation<
        GenerateTokensApiResponse,
        GenerateTokensApiArg
      >({
        query: (queryArg) => ({
          url: `/identity/generate-tokens`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["identity"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GetCurrentUserApiResponse =
  /** status 200 Returns the current logged in user or null */ {
    email?: Email;
    displayName?: DisplayName;
  };
export type GetCurrentUserApiArg = void;
export type GenerateTokensApiResponse =
  /** status 200 accessToken and refreshTokens are successfully generated. */ undefined;
export type GenerateTokensApiArg = {
  body: {
    email?: Email;
    password?: Password;
  };
};
export type Email = string;
export type DisplayName = string;
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export type Password = string;
export const { useGetCurrentUserQuery, useGenerateTokensMutation } =
  injectedRtkApi;
