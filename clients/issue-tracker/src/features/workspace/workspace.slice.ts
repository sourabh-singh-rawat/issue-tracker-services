import { createSlice } from "@reduxjs/toolkit";
import { Workspace } from "../../api/codegen/gql/graphql";

const initialState: { workspaces: Workspace[]; defaultWorkspace: Workspace } = {
  workspaces: [],
  defaultWorkspace: {
    id: "",
    name: "",
    description: "",
    status: "",
    createdById: "",
  },
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      return { ...state, workspaces: action.payload || [] };
    },
    setDefaultWorkspace: (state, action) => {
      return { ...state, defaultWorkspace: action.payload };
    },
  },
});

export const { setWorkspaces, setDefaultWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
