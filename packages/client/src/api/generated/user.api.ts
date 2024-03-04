import { apiSlice as api } from "../api.config";
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
            url: `/users/register`,
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
          url: `/users/default-workspace`,
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
  /** status 201 User successfully registered */ undefined;
export type RegisterUserApiArg = {
  inviteToken?: string;
  body: {
    email: string;
    password: string;
    displayName: string;
  };
};
export type SetDefaultWorkspaceApiResponse =
  /** status 200 Default workspace updated successfully */ undefined;
export type SetDefaultWorkspaceApiArg = {
  body: {
    id: string;
    name: string;
  };
};
export type Schema = {
  errors?: {
    message: string;
    field?: string;
  }[];
};
export const { useRegisterUserMutation, useSetDefaultWorkspaceMutation } =
  injectedRtkApi;
