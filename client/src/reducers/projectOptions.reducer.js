import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectStatus: [{ code: 0, message: "Not Started" }],
  projectMemberRoles: [{ code: 0, message: "Member" }],
};

const projectOptionsSlice = createSlice({
  name: "projectOptions",
  initialState,
  reducers: {
    setProjectStatus: (state, action) => {
      return { ...state, projectStatus: action.payload };
    },
    setProjectMemberRoles: (state, action) => {
      return { ...state, projectMemberRoles: action.payload };
    },
  },
});

export const { setProjectStatus, setProjectMemberRoles } =
  projectOptionsSlice.actions;
export default projectOptionsSlice.reducer;
