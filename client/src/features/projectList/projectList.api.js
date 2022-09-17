import { apiSlice } from "../../app/services/api.service";

const projectListApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query({
      query: ({ page = 0, pageSize = 10, sortBy = "creation_date:desc" }) =>
        `/projects?page=${page}&limit=${pageSize}&sort_by=${sortBy}`,
      providesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery } = projectListApiSlice;
