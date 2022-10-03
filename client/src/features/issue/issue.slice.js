import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  info: {
    nameSelected: false,
    descriptionSelected: false,
    status: 0,
    priority: 0,
  },
  options: {
    status: { loading: true, result: [{ status: 0, message: "to do" }] },
    priority: { loading: true, result: [{ status: 0, message: "lowest" }] },
  },
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setIssue: (state, action) => {
      state.info = action.payload;
      return state;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
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
