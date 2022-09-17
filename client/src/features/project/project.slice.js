import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activty: [],
  info: {
    name: "",
    nameSelected: false,
    description: "",
    descriptionSelected: false,
    creation_date: null,
    owner_uid: "",
    id: "",
    loading: true,
    status: 0,
  },
  members: { rows: [], rowCount: 0, page: 0, pageSize: 10 },
  issues: { rows: [], rowCount: 0, page: 0, pageSize: 10 },
  issuesStatusCount: [
    { status: 0, count: 0 },
    { status: 1, count: 0 },
    { status: 2, count: 0 },
    { status: 3, count: 0 },
  ],
  options: {
    status: { loading: true, result: [{ code: 0, message: "Not Started" }] },
    roles: { loading: true, result: [{ code: 0, message: "Member" }] },
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      return { ...state, info: { ...action.payload } };
    },
    updateProject: (state, action) => ({
      ...state,
      info: { ...state.info, ...action.payload },
    }),

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
      state.issuesStatusCount = action.payload;
      return state;
    },
    setStatus: (state, action) => {
      state.options.status.loading = false;
      state.options.status.result = action.payload;
      return state;
    },
    setMemberRoles: (state, action) => {
      state.options.roles = action.payload;
      return state;
    },
  },
});

export const {
  setProject,
  updateProject,
  setStatus,
  setMemberRoles,
  setIssueStatusCount,
  setList,
  updateList,
  setMembers,
  updateMembers,
} = projectSlice.actions;

export default projectSlice.reducer;
