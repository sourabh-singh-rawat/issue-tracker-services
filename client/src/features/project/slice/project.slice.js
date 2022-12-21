import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activity: { rows: [], rowCount: 0, page: 0, pageSize: 0, isLoading: true },
  quick: {
    isLoading: true,
    name: "",
    nameSelected: false,
    description: "",
    descriptionSelected: false,
    createdAt: null,
    status: "b5148da1-e82f-439a-86ba-7b5dbf076277",
  },
  settings: {
    name: "",
    description: "",
    descriptionSelected: false,
    createdAt: null,
    ownerId: null,
    id: "",
    status: "",
    isLoading: true,
  },
  members: { rows: [], rowCount: 0, page: 0, pageSize: 10, isLoading: true },
  issuesStatusCount: { isLoading: true, rows: [] },
  options: {
    status: { rows: [{ id: "", name: "", description: "" }], isLoading: true },
    roles: { rows: [{ id: "", name: "", description: "" }], isLoading: true },
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
        createdAt,
        status,
      } = action.payload;

      state.quick = {
        name,
        nameSelected,
        description,
        descriptionSelected,
        createdAt,
        status,
        isLoading: false,
      };

      return state;
    },
    setProject: (state, action) => {
      state.settings = {
        ...state.settings,
        ...action.payload,
        isLoading: false,
      };

      return state;
    },
    setMembers: (state, action) => {
      state.members.rows = action.payload.rows;
      state.members.rowCount = action.payload.rowCount;
      state.members.isLoading = false;

      return state;
    },
    updateProject: (state, action) => {
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    },
    updateProjectQuick: (state, action) => {
      state.quick = { ...state.quick, ...action.payload };

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
      state.issuesStatusCount.isLoading = false;

      return state;
    },
    setStatus: (state, action) => {
      state.options.status.isLoading = false;
      state.options.status.rows = action.payload.rows;

      return state;
    },
    setMemberRoles: (state, action) => {
      state.options.roles.rows = action.payload.rows;
      state.options.roles.rowCount = action.payload.rowCount;

      return state;
    },
    setActivity: (state, action) => {
      return {
        ...state,
        activity: { ...state.activity, ...action.payload, isLoading: false },
      };
    },
    resetProjectSlice: () => initialState,
  },
});

export const {
  setActivity,
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
  resetProjectSlice,
} = projectSlice.actions;

export default projectSlice.reducer;
