import { apiSlice } from "../../app/services/api.service";

const issueListApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getIssues: build.query({
      query: ({
        page = 0,
        pageSize = 10,
        sortBy = "creation_date:desc",
        reporterId,
      }) =>
        `/issues?page=${page}&limit=${pageSize}&sort_by=${sortBy}&reporterId=${reporterId}`,
      providesTags: ["Issue"],
    }),
  }),
});

export const { useGetIssuesQuery } = issueListApiSlice;
