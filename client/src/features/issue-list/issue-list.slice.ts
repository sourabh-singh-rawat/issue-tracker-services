/* eslint-disable operator-linebreak */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  page: 0,
  pageSize: 10,
  filters: {},
  isLoading: true,
};

const issueListSlice = createSlice({
  name: "issueList",
  initialState,
  reducers: {
    setIssueList: (state, action) => ({
      ...state,
      rows: action.payload.rows,
      rowCount: action.payload.rowCount,
      isLoading: false,
    }),
    updateIssueList: (state, action) => ({ ...state, ...action.payload }),
    resetIssueList: () => initialState,
  },
});

export const { setIssueList, updateIssueList, resetIssueList } =
  issueListSlice.actions;
export default issueListSlice.reducer;
