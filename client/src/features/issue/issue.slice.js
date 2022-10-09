import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: {
    loading: true,
    rows: [],
    rowCount: [],
  },
  info: {
    nameSelected: false,
    descriptionSelected: false,
    loading: true,
    status: 0,
    priority: 0,
  },
  options: {
    status: { loading: true, result: [{ status: 0, message: "to do" }] },
    priority: { loading: true, result: [{ status: 0, message: "lowest" }] },
  },
  tasks: { loading: true, rows: [], rowCount: [] },
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setIssue: (state, action) => {
      state.info = { ...state.info, ...action.payload, loading: false };

      return state;
    },
    setComments: (state, action) => {
      state.comments = { ...state.comments, ...action.payload, loading: false };

      return state;
    },
    setIssueStatus: (state, action) => {
      state.options.status.loading = false;
      state.options.status.result = action.payload;
      return state;
    },
    setIssuePriority: (state, action) => {
      state.options.priority.loading = false;
      state.options.priority.result = action.payload;
      return state;
    },
    updateIssue: (state, action) => {
      state.info = { ...state.info, ...action.payload };
      return state;
    },
  },
});

export const {
  setIssue,
  setComments,
  setIssueStatus,
  setIssuePriority,
  updateIssue,
} = issueSlice.actions;
export default issueSlice.reducer;
