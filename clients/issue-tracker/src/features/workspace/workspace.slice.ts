import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaces: [],
  defaultWorkspace: { id: "", name: "", createdAt: "", description: "" },
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
