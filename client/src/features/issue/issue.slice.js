import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activity: {},
  info: {
    nameSelected: false,
    descriptionSelected: false,
    status: "0_OPEN",
    priority: "0_LOWEST",
    loading: true,
    assignee_id: null,
    project_id: null,
  },
  options: {
    status: { loading: true, rows: [{ status: "0_OPEN", message: "open" }] },
    priority: {
      rows: [{ priority: "0_LOWEST", message: "lowest" }],
      loading: true,
    },
  },
};

const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    setIssue: (state, action) => {
      state.info = { ...state.info, ...action.payload, loading: false };

      return state;
    },
    setIssueStatus: (state, action) => {
      state.options.status.rows = action.payload.rows;
      state.options.status.loading = false;

      return state;
    },
    setIssuePriority: (state, action) => {
      state.options.priority.rows = action.payload.rows;
      state.options.priority.loading = false;

      return state;
    },
    updateIssue: (state, action) => {
      state.info = { ...state.info, ...action.payload };
      return state;
    },
  },
});

export const { setIssue, setIssueStatus, setIssuePriority, updateIssue } =
  issueSlice.actions;
export default issueSlice.reducer;
