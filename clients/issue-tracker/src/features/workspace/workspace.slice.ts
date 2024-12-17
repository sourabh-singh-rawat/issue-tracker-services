import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace } from "../../api/codegen/gql/graphql";

interface WorkspaceSlice {
  current: Workspace | null;
  workspaces: Workspace[];
}

const initialState: WorkspaceSlice = {
  current: null,
  workspaces: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    configureWorkspaceSlice: (state, action: PayloadAction<Workspace[]>) => {
      const workspaces = action.payload || [];

      return {
        ...state,
        current: workspaces.find((w) => w.status === "Default") || null,
        workspaces,
      };
    },
  },
});

export const { configureWorkspaceSlice } = workspaceSlice.actions;
export default workspaceSlice.reducer;
