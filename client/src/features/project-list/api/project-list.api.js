import { apiSlice } from "../../../config/api.config.js";

const projectListApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query({
      query: ({ page = 0, pageSize = 10, sortBy = "created_at:desc" }) =>
        `/projects?page=${page}&limit=${pageSize}&sort_by=${sortBy}`,
      providesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery } = projectListApiSlice;
