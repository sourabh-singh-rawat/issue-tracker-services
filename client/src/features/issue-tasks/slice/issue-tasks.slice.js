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
    resetTasks: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setTasks, setTasksLoading, resetTasks } =
  issueTasksSlice.actions;
export default issueTasksSlice.reducer;
