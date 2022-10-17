import { apiSlice } from "../../app/services/api.service";

const issueTasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createIssueTask: build.mutation({
      query: (body) => {
        return {
          url: "/issues/tasks",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Task"],
    }),
    getIssueTasks: build.query({
      query: (id) => {
        return `/issues/${id}/tasks`;
      },
      providesTags: ["Task"],
    }),
    updateIssueTask: build.mutation({
      query: ({ id, taskId, body }) => {
        return {
          url: `/issues/${id}/tasks/${taskId}`,
          method: "PATCH",
          body,
        };
      },
    }),
    deleteIssueTask: build.mutation({
      query: ({ id, taskId }) => {
        return {
          url: `/issues/${id}/tasks/${taskId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetIssueTasksQuery,
  useCreateIssueTaskMutation,
  useUpdateIssueTaskMutation,
  useDeleteIssueTaskMutation,
} = issueTasksApiSlice;
