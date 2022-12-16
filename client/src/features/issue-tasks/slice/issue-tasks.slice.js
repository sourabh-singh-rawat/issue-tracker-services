import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: [],
  completedTasks: {},
  isLoading: true,
};

const issueTasksSlice = createSlice({
  name: "issueTasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;
      state.isLoading = false;

      return state;
    },
    setTasksLoading: (state, action) => {
      state.isLoading = true;

      return state;
    },
  },
});

export const { setTasks, setTasksLoading } = issueTasksSlice.actions;
export default issueTasksSlice.reducer;
