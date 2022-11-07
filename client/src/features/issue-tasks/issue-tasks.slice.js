import { createSlice } from "@reduxjs/toolkit";
import startOfYesterday from "date-fns/esm/startOfYesterday/index";

const initialState = {
  rows: [],
  rowCount: [],
  loading: true,
};

const issueTasksSlice = createSlice({
  name: "issueTasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.rows = action.payload.rows;
      state.rowCount = action.payload.rowCount;
      state.loading = false;

      return state;
    },
  },
});

export const { setTasks } = issueTasksSlice.actions;
export default issueTasksSlice.reducer;
