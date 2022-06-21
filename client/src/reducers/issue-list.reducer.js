import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  rowCount: 0,
  isLoading: false,
  page: 0,
  pageSize: 10,
};

// create team
// then add team to the project
// this project is managed by: pep team

const issueListSlice = createSlice({
  name: "issueList",
  initialState,
  reducers: {
    setIssueList: (state, action) => ({
      ...state,
      rows: action.payload.data,
      rowCount: action.payload.rowCount,
    }),
    updateIssueList: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setIssueList, updateIssueList } = issueListSlice.actions;
export default issueListSlice.reducer;
