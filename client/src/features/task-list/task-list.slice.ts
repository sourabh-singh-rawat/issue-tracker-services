import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {},
});

export default taskListSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const {} = taskListSlice.actions;
