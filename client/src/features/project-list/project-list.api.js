/* eslint-disable import/prefer-default-export */
/* eslint-disable implicit-arrow-linebreak */

import apiSlice from '../../config/api.config';

const projectListApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query({
      query: ({ page = 0, pageSize = 10, sortBy = 'createdAt:desc' }) =>
        `/projects?page=${page}&limit=${pageSize}&sortBy=${sortBy}`,
      providesTags: ['Project'],
    }),
  }),
});

export const { useGetProjectsQuery } = projectListApiSlice;
