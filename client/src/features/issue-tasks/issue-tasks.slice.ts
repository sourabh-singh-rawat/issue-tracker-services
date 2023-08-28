/* eslint-disable operator-linebreak */
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
    setTasks: (state, action) => ({
      ...state,
      rows: action.payload.rows,
      rowCount: action.payload.rowCount,
      isLoading: false,
    }),
    resetTasks: () => initialState,
  },
});

export const { setTasks, resetTasks } = issueTasksSlice.actions;
export default issueTasksSlice.reducer;
