import { apiSlice } from "../../app/services/api.service";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
