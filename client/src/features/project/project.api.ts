/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */

import apiSlice from "../../store/api.config";

const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: ({ body }) => {
        const { name, description, status, endDate, startDate } = body;

        return {
          url: "/projects",
          method: "POST",
          body: {
            name: name.value,
            description: description.value,
            status,
            endDate,
            startDate,
          },
        };
      },
      invalidatesTags: ["Project"],
    }),
    getStatus: build.query({
      query: () => "/projects/status",
    }),
    getRoles: build.query({
      query: () => "/projects/members/roles",
    }),
    getProject: build.query({
      query: (id) => `/projects/${id}`,
      providesTags: ["Project"],
    }),
    getProjectIssues: build.query({
      query: ({
        page = 0,
        pageSize = 10,
        projectId = "",
        sortBy = "createdAt:desc",
      }) =>
        `/issues?projectId=${projectId}&page=${page}&limit=${pageSize}&sortBy=${sortBy}`,
    }),
    getProjectMembers: build.query({
      query: (id) => `/projects/${id}/members`,
    }),
    getProjectIssuesStatusCount: build.query({
      query: (id) => `/projects/${id}/issuesStatusCount`,
      providesTags: ["IssueStats"],
    }),
    getProjectActivity: build.query({
      query: (id) => `/projects/${id}/activity`,
    }),
    updateProject: build.mutation({
      query: ({ id, body }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: ({ data }) => data,
      invalidatesTags: ["Project"],
    }),
    deleteProject: build.mutation({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
    sendInvite: build.mutation({
      query: ({ id, payload }) => ({
        url: `/projects/${id}/members/invite`,
        method: "POST",
        body: payload,
      }),
    }),
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
  useGetProjectActivityQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useSendInviteMutation,
} = projectApiSlice;
