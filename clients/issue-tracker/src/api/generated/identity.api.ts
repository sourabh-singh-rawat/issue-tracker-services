import { apiSlice as api } from "../auth.config";
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
          url: `/api/v1/identity/generate-tokens`,
          method: "POST",
          body: queryArg.body,
          headers: { Cookie: queryArg.cookie },
        }),
        invalidatesTags: ["identity"],
      }),
      revokeTokens: build.mutation<RevokeTokensApiResponse, RevokeTokensApiArg>(
        {
          query: (queryArg) => ({
            url: `/api/v1/identity/revoke-tokens`,
            method: "POST",
            headers: { Cookie: queryArg.cookie },
          }),
        },
      ),
      getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
      >({
        query: () => ({ url: `/api/v1/users/me` }),
        providesTags: ["identity"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type GenerateTokensApiResponse = /** status 200 Default Response */ {};
export type GenerateTokensApiArg = {
  cookie?: string;
  body: {
    email: string;
    password: string;
  };
};
export type RevokeTokensApiResponse = /** status 200 Default Response */ {};
export type RevokeTokensApiArg = {
  cookie?: string;
};
export type GetCurrentUserApiResponse = /** status 200 Default Response */ {
  userId?: string;
  displayName?: string;
  email?: EmailSchema;
  emailVerificationStatus?: string;
  createdAt?: string;
};
export type GetCurrentUserApiArg = void;
export type EmailSchema = string;
export const {
  useGenerateTokensMutation,
  useRevokeTokensMutation,
  useGetCurrentUserQuery,
} = injectedRtkApi;
