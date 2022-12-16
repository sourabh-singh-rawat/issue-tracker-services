import { apiSlice } from "../../../config/api.config.js";

const issueTasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (body) => {
        return {
          url: "/issues/tasks",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Task"],
    }),
    getTasks: build.query({
      query: ({ id }) => {
        return `/issues/${id}/tasks`;
      },
      providesTags: ["Task"],
    }),
    updateTask: build.mutation({
      query: ({ id, taskId, body }) => {
        return {
          url: `/issues/${id}/tasks/${taskId}`,
          method: "PATCH",
          body,
        };
      },
    }),
    deleteTask: build.mutation({
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
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = issueTasksApiSlice;
