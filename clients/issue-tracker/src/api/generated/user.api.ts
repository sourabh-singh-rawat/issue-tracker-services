import { apiSlice as api } from "../auth.config";
export const addTagTypes = ["user", "project", "issue"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      registerUser: build.mutation<RegisterUserApiResponse, RegisterUserApiArg>(
        {
          query: (queryArg) => ({
            url: `/auth/users/register`,
            method: "POST",
            body: queryArg.body,
            params: { inviteToken: queryArg.inviteToken },
          }),
          invalidatesTags: ["user"],
        },
      ),
      setDefaultWorkspace: build.mutation<
        SetDefaultWorkspaceApiResponse,
        SetDefaultWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/auth/users/default-workspace`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["user", "project", "issue"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as issueTrackerApi };
export type RegisterUserApiResponse =
  /** status 201 User successfully registered */ void;
export type RegisterUserApiArg = {
  inviteToken?: string;
  body: {
    email: string;
    password: string;
    displayName: string;
  };
};
export type SetDefaultWorkspaceApiResponse =
  /** status 200 Default workspace updated successfully */ void;
export type SetDefaultWorkspaceApiArg = {
  body: {
    id: string;
    name: string;
  };
};
export const { useRegisterUserMutation, useSetDefaultWorkspaceMutation } =
  injectedRtkApi;
