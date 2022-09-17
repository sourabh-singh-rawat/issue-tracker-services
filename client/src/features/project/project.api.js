import { apiSlice } from "../../app/services/api.service";

const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: ({ payload }) => {
        return {
          url: "/projects",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Project"],
    }),
    getStatus: build.query({
      query: () => {
        return `/projects/status`;
      },
    }),
    getRoles: build.query({
      query: () => {
        return `/projects/members/roles`;
      },
    }),
    getProject: build.query({
      query: (id) => {
        return `/projects/${id}`;
      },
    }),
    getProjectIssues: build.query({
      query: ({
        page = 0,
        pageSize = 10,
        projectId = "",
        sortBy = "creation_date:desc",
      }) => {
        return `/issues?project_id=${projectId}&page=${page}&limit=${pageSize}&sort_by=${sortBy}`;
      },
    }),
    getProjectMembers: build.query({
      query: (id) => {
        return `/projects/${id}/members`;
      },
    }),
    getProjectIssuesStatusCount: build.query({
      query: (id) => {
        return `/projects/${id}/issuesStatusCount`;
      },
    }),
    updateProject: build.mutation({
      query: ({ uid, payload }) => {
        return {
          url: `/projects/${uid}`,
          method: "PATCH",
          body: payload,
        };
      },
      transformResponse: (response) => response.data,
      invalidatesTags: ["Project"],
    }),
    deleteProject: build.mutation({
      query: ({ id }) => {
        return {
          url: `/projects/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Project"],
    }),
    sendInvite: build.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/projects/${id}/members/invite`,
          method: "POST",
          body: payload,
        };
      },
    }),
    // createProjectMember: build.mutation({
    //   query: ({ id, payload }) => {
    //     return {
    //       url: `/projects/${id}/members`,
    //       method: `POST`,
    //       body: payload,
    //     };
    //   },
    // }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetRolesQuery,
  useGetStatusQuery,
  useGetProjectQuery,
  useGetProjectIssuesQuery,
  useGetProjectMembersQuery,
  useGetProjectIssuesStatusCountQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useSendInviteMutation,
} = projectApiSlice;
