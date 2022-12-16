import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activty: {},
  quick: {
    isLoading: true,
    name: "",
    nameSelected: false,
    description: "",
    descriptionSelected: false,
    created_at: null,
    status: "b5148da1-e82f-439a-86ba-7b5dbf076277",
  },
  settings: {
    name: "",
    description: "",
    descriptionSelected: false,
    created_at: null,
    owner_id: null,
    id: "",
    status: "",
    isLoading: true,
  },
  members: {
    isLoading: true,
    rows: [],
    rowCount: 0,
    page: 0,
    pageSize: 10,
  },
  issuesStatusCount: {
    isLoading: true,
    rows: [],
  },
  options: {
    status: {
      isLoading: true,
      rows: [{ id: "", name: "", description: "" }],
    },
    roles: {
      isLoading: true,
      rows: [{ id: "", name: "", description: "" }],
    },
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
        created_at,
        status,
      } = action.payload;

      state.quick = {
        name,
        nameSelected,
        description,
        descriptionSelected,
        created_at,
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
    resetProjectSlice: (state) => {
      state = initialState;

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
  resetProjectSlice,
} = projectSlice.actions;

export default projectSlice.reducer;
