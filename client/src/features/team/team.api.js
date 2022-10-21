import { apiSlice } from "../../configs/api.config.js";

const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTeam: build.query({
      query: (id) => `teams/${id}`,
    }),
    getTeams: build.query({
      query: () => `teams`,
    }),
  }),
});

export const { useGetTeamQuery, useGetTeamsQuery } = teamApiSlice;
