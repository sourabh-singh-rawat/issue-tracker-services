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
    status: "0_OPEN",
    priority: "0_LOWEST",
    assignee_id: null,
    project_id: null,
    isLoading: true,
  },
  options: {
    status: {
      rows: [{ status: "0_OPEN", message: "open" }],
      isLoading: true,
    },
    priority: {
      rows: [{ priority: "0_LOWEST", message: "lowest" }],
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
