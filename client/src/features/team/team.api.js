import { apiSlice } from "../../app/services/api.service";

const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTeam: build.query({
      query: (id) => `/teams/${id}`,
    }),
    getTeams: build.query({
      query: () => `/teams`,
    }),
  }),
});

export const { useGetTeamQuery, useGetTeamsQuery } = teamApiSlice;
