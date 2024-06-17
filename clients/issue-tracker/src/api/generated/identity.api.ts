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
          url: `/auth/identity/generate-tokens`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["identity"],
      }),
      revokeTokens: build.mutation<RevokeTokensApiResponse, RevokeTokensApiArg>(
        {
          query: () => ({
            url: `/auth/identity/revoke-tokens`,
            method: "POST",
          }),
          invalidatesTags: ["identity"],
        },
      ),
      getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
      >({
        query: () => ({ url: `/auth/users/me` }),
        providesTags: ["identity"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GenerateTokensApiResponse =
  /** status 200 accessToken and refreshTokens are successfully generated. */ void;
export type GenerateTokensApiArg = {
  body: {
    email?: string;
    password?: string;
  };
};
export type RevokeTokensApiResponse =
  /** status 200 Tokens were successfully removed */ void;
export type RevokeTokensApiArg = void;
export type GetCurrentUserApiResponse =
  /** status 200 Returns the current logged in user or null */ {
    email?: string;
    displayName?: string;
    defaultWorkspaceId?: string;
    defaultWorkspaceName?: string;
  };
export type GetCurrentUserApiArg = void;
export const {
  useGenerateTokensMutation,
  useRevokeTokensMutation,
  useGetCurrentUserQuery,
} = injectedRtkApi;
