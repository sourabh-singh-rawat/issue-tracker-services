import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activty: {},
  quick: {
    name: "",
    nameSelected: false,
    description: "",
    descriptionSelected: false,
    creation_date: null,
    status: "0_NOT_STARTED",
    loading: true,
  },
  settings: {
    name: "",
    description: "",
    descriptionSelected: false,
    creation_date: null,
    owner_id: null,
    id: "",
    status: "0_NOT_STARTED",
    loading: true,
  },
  members: { rows: [], rowCount: 0, page: 0, pageSize: 10 },
  issuesStatusCount: {
    loading: true,
    rows: [
      { status: "0_NOT_STARTED", count: 0 },
      { status: "1_OPEN", count: 0 },
      { status: "2_PAUSED", count: 0 },
      { status: "3_COMPLETED", count: 0 },
    ],
  },
  options: {
    status: {
      loading: true,
      rows: [{ code: "NOT_STARTED", message: "Not Started" }],
    },
    roles: { loading: true, rows: [{ code: "MEMBER", message: "Member" }] },
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectQuick: (state, action) => {
      const {
        name,
        nameSelected,
        description,
        descriptionSelected,
        creation_date,
        status,
      } = action.payload;
      state.quick = {
        name,
        nameSelected,
        description,
        descriptionSelected,
        creation_date,
        status,
        loading: false,
      };

      return state;
    },
    setProject: (state, action) => {
      state.settings = { ...state.settings, ...action.payload, loading: false };
      return state;
    },
    updateProject: (state, action) => ({
      ...state,
      settings: { ...state.settings, ...action.payload },
    }),
    updateProjectQuick: (state, action) => {
      state.quick = { ...state.quick, ...action.payload };
      return state;
    },
    setMembers: (state, action) => {
      state.members.rows = action.payload.rows;
      state.members.rowCount = action.payload.rowCount;
      return state;
    },
    updateMembers: (state, action) => {
      return {
        ...state,
        members: { ...state.members, ...action.payload },
      };
    },
    setIssueStatusCount: (state, action) => {
      state.issuesStatusCount.rows = action.payload;
      state.issuesStatusCount.loading = false;

      return state;
    },
    setStatus: (state, action) => {
      state.options.status.loading = false;
      state.options.status.rows = action.payload.rows;

      return state;
    },
    setMemberRoles: (state, action) => {
      state.options.roles.rows = action.payload.rows;
      state.options.roles.rowCount = action.payload.rowCount;

      return state;
    },
  },
});

export const {
  setStatus,
  setMemberRoles,
  setList,
  setIssueStatusCount,
  setProject,
  setProjectQuick,
  setMembers,
  updateProject,
  updateProjectQuick,
  updateList,
  updateMembers,
} = projectSlice.actions;

export default projectSlice.reducer;
