import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activity: {
    rows: [],
    rowCount: 0,
    page: 0,
    pageSize: 0,
    isLoading: true,
  },
  settings: {
    name: "",
    nameSelected: false,
    description: "",
    descriptionSelected: false,
    createdAt: null,
    ownerId: null,
    id: "",
    status: "",
    isLoading: true,
  },
  members: {
    rows: [],
    rowCount: 0,
    page: 0,
    pageSize: 10,
    isLoading: true,
  },
  issuesStatusCount: { isLoading: true, rows: [] },
  options: {
    status: {
      rowCount: 0,
      rows: [{ id: "", name: "", description: "" }],
      isLoading: true,
    },
    roles: {
      rowCount: 0,
      rows: [{ id: "", name: "", description: "" }],
      isLoading: true,
    },
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => ({
      ...state,
      settings: {
        ...state.settings,
        ...action.payload,
        previousName: "",
        isLoading: false,
      },
    }),
    setMembers: (state, action) => ({
      ...state,
      members: {
        ...state.members,
        rows: action.payload.rows,
        rowCount: action.payload.rowCount,
        isLoading: false,
      },
    }),
    updateProject: (state, action) => ({
      ...state,
      settings: { ...state.settings, ...action.payload },
    }),
    updateMembers: (state, action) => ({
      ...state,
      members: { ...state.members, ...action.payload },
    }),
    setIssueStatusCount: (state, action) => ({
      ...state,
      issuesStatusCount: {
        ...state.issuesStatusCount,
        rows: action.payload,
        isLoading: false,
      },
    }),
    setStatus: (state, action) => ({
      ...state,
      options: {
        ...state.options,
        status: {
          ...state.options.status,
          rows: action.payload.rows,
          isLoading: false,
        },
      },
    }),
    setMemberRoles: (state, action) => ({
      ...state,
      options: {
        ...state.options,
        roles: {
          ...state.options.roles,
          rows: action.payload.rows,
          rowCount: action.payload.rowCount,
          isLoading: false,
        },
      },
    }),
    setActivity: (state, action) => ({
      ...state,
      activity: { ...state.activity, ...action.payload, isLoading: false },
    }),
    reset: () => initialState,
  },
});

export const {
  setActivity,
  setStatus,
  setMemberRoles,
  setIssueStatusCount,
  setProject,
  setMembers,
  updateProject,
  updateMembers,
  reset,
} = projectSlice.actions;

export default projectSlice.reducer;
