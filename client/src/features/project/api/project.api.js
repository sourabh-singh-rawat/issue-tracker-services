import { apiSlice } from "../../../config/api.config.js";

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
      providesTags: ["Project"],
    }),
    getProjectIssues: build.query({
      query: ({
        page = 0,
        pageSize = 10,
        projectId = "",
        sortBy = "created_at:desc",
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
      providesTags: ["IssueStats"],
    }),
    getProjectActivity: build.query({
      query: (id) => {
        return `/projects/${id}/activity`;
      },
    }),
    updateProject: build.mutation({
      query: ({ id, body }) => {
        return {
          url: `/projects/${id}`,
          method: "PATCH",
          body,
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
