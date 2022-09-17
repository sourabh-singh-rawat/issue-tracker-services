import { apiSlice } from "../../app/services/api.service";

const collaboratorApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCollaborators: build.query({
      query: (uid) => `/collaborators?uid=${uid}`,
    }),
  }),
});

export const { useGetCollaboratorsQuery } = collaboratorApiSlice;
