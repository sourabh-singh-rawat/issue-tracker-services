/* eslint-disable operator-linebreak */
/* eslint-disable import/extensions */
import apiSlice from '../../../config/api.config.js';

const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTeam: build.query({
      query: (id) => `teams/${id}`,
    }),
    getTeams: build.query({
      query: () => 'teams',
    }),
    createTeam: build.mutation({
      query: ({ body }) => ({
        url: 'teams',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetTeamQuery, useGetTeamsQuery, useCreateTeamMutation } =
  teamApiSlice;
