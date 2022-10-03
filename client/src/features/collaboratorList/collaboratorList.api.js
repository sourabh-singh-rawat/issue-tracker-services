import { apiSlice } from "../../app/services/api.service";

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
