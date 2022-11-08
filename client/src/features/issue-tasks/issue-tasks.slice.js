import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: [],
  isLoading: true,
  completedTasks: {},
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
  },
});

export const { setTasks } = issueTasksSlice.actions;
export default issueTasksSlice.reducer;
