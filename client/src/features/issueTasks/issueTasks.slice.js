import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completed: {
    rows: [],
    rowCount: [],
    loading: true,
  },
  incompleted: {
    rows: [],
    rowCount: [],
    loading: true,
  },
};

const issueTasksSlice = createSlice({
  name: "issueTasks",
  initialState,
  reducers: {
    setCompletedTasks: (state, action) => {
      state.completed.rows = action.payload.rows;
      state.completed.rowCount = action.payload.rowCount;
      state.completed.loading = false;

      return state;
    },
    setIncompleteTasks: (state, action) => {
      state.incompleted.rows = action.payload.rows;
      state.incompleted.rowCount = action.payload.rowCount;
      state.incompleted.loading = false;

      return state;
    },
    setLoadingTasks: (state, action) => {
      state.loading = true;
      return state;
    },
  },
});

export const { setCompletedTasks, setIncompleteTasks, setLoadingTasks } =
  issueTasksSlice.actions;
export default issueTasksSlice.reducer;
