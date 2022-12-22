/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import apiSlice from '../../../config/api.config.js';

const collaboratorApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCollaborators: build.query({
      query: () => '/collaborators',
    }),
  }),
});

export const { useGetCollaboratorsQuery } = collaboratorApiSlice;
