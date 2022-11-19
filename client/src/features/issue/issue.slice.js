import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activity: {},
  attachments: {
    rows: [],
    rowCount: 0,
    isLoading: true,
  },
  info: {
    name: "",
    nameSelected: false,
    descriptionSelected: false,
    status: "",
    priority: "",
    assignee_id: 0,
    project_id: null,
    isLoading: true,
  },
  options: {
    status: {
      rows: [{ id: "3afb292b-64b1-4bda-9218-6ce799cb41bf", name: "Lowest" }],
      isLoading: true,
    },
    priority: {
      rows: [{ id: "250c0236-5729-44a9-990a-6d56f882ba9d", name: "To Do" }],
      isLoading: true,
    },
  },
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setIssue: (state, action) => {
      state.info = { ...state.info, ...action.payload, isLoading: false };

      return state;
    },
    setIssueStatus: (state, action) => {
      state.options.status.rows = action.payload.rows;
      state.options.status.isLoading = false;

      return state;
    },
    setIssuePriority: (state, action) => {
      state.options.priority.rows = action.payload.rows;
      state.options.priority.isLoading = false;

      return state;
    },
    setIssueAttachments: (state, action) => {
      state.attachments.rows = action.payload.rows;
      state.attachments.rowCount = action.payload.rowCount;
      state.attachments.isLoading = false;

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
  setIssueStatus,
  setIssuePriority,
  setIssueAttachments,
  updateIssue,
} = issueSlice.actions;
export default issueSlice.reducer;
