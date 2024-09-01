import { apiSlice as api } from "../auth.config";
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
            url: `/api/v1/users/register`,
            method: "POST",
            body: queryArg.body,
            params: { workspaceInviteToken: queryArg.workspaceInviteToken },
          }),
          invalidatesTags: ["user"],
        },
      ),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type RegisterUserApiResponse = /** status 200 Default Response */ {};
export type RegisterUserApiArg = {
  workspaceInviteToken?: string;
  body: {
    email: string;
    password: string;
    displayName: string;
  };
};
export const { useRegisterUserMutation } = injectedRtkApi;
