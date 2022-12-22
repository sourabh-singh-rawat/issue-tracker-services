/* eslint-disable import/extensions */
import apiSlice from '../../../config/api.config.js';

const issueTasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (body) => ({
        url: '/issues/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    getTasks: build.query({
      query: ({ id }) => `/issues/${id}/tasks`,
      providesTags: ['Task'],
    }),
    updateTask: build.mutation({
      query: ({ id, taskId, body }) => ({
        url: `/issues/${id}/tasks/${taskId}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteTask: build.mutation({
      query: ({ id, taskId }) => ({
        url: `/issues/${id}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = issueTasksApiSlice;
