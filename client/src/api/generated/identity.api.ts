import { apiSlice as api } from "../api.config";
export const addTagTypes = ["identity"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
      revokeTokens: build.mutation<RevokeTokensApiResponse, RevokeTokensApiArg>(
        {
          query: () => ({ url: `/identity/revoke-tokens`, method: "POST" }),
          invalidatesTags: ["identity"],
        },
      ),
      getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
      >({
        query: () => ({ url: `/users/me` }),
        providesTags: ["identity"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GenerateTokensApiResponse =
  /** status 200 accessToken and refreshTokens are successfully generated. */ undefined;
export type GenerateTokensApiArg = {
  body: {
    email?: Email;
    password?: Password;
  };
};
export type RevokeTokensApiResponse =
  /** status 200 Tokens were successfully removed */ undefined;
export type RevokeTokensApiArg = void;
export type GetCurrentUserApiResponse =
  /** status 200 Returns the current logged in user or null */ {
    email?: Email;
    displayName?: DisplayName;
    defaultWorkspaceId?: Name;
    defaultWorkspaceName?: Name;
  };
export type GetCurrentUserApiArg = void;
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export type Email = string;
export type Password = string;
export type DisplayName = string;
export type Name = string;
export const {
  useGenerateTokensMutation,
  useRevokeTokensMutation,
  useGetCurrentUserQuery,
} = injectedRtkApi;
