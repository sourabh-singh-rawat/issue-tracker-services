import { apiSlice } from "../../configs/rtk.config.js";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
