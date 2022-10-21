import { apiSlice } from "../../configs/api.config.js";

const collaboratorApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCollaborators: build.query({
      query: () => {
        return `/collaborators`;
      },
    }),
  }),
});

export const { useGetCollaboratorsQuery } = collaboratorApiSlice;
