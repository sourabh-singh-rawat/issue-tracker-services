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
    setCurrentWorkspace(state, action: PayloadAction<Workspace>) {
      return { ...state, current: action.payload };
    },
    setWorkspaces(state, action: PayloadAction<Workspace[]>) {
      const workspaces = action.payload || [];

      return { ...state, workspaces };
    },
  },
});

export const { setWorkspaces, setCurrentWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
