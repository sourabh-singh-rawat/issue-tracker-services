import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  nameSelected: false,
  description: "",
  descriptionSelected: false,
  status: "",
  owner_uid: "",
  owner_email: "",
  start_date: "",
  end_date: "",
};

const projectReducer = createSlice({
  name: "currentProject",
  initialState,
  reducers: {
    // case reducers
    setProject: (state, action) => ({ ...state, ...action.payload }),
    updateProject: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setProject, updateProject } = projectReducer.actions;
export default projectReducer.reducer;
