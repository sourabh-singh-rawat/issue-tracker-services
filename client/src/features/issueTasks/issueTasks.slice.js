import { createSlice } from "@reduxjs/toolkit";

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
    setLoadingTasks: (state, action) => {
      state.loading = true;
      return state;
    },
  },
});

export const { setTasks, setLoadingTasks } = issueTasksSlice.actions;
export default issueTasksSlice.reducer;
