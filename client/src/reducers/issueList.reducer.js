import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
};

const issueListSlice = createSlice({
  name: "issueList",
  initialState,
  reducers: {
    setIssueList: (state, action) => ({
      ...state,
      rows: action.payload.rows,
      rowCount: action.payload.rowCount,
    }),
    updateIssueList: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setIssueList, updateIssueList } = issueListSlice.actions;
export default issueListSlice.reducer;
