import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Space } from "../../api";

interface SpaceSlice {
  spaces: Space[];
}

const initialState: SpaceSlice = {
  spaces: [],
};

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setSpaces: (state, action: PayloadAction<Space[]>) => {
      return {
        ...state,
        spaces: action.payload,
      };
    },
  },
});

export const { setSpaces } = spaceSlice.actions;
export default spaceSlice.reducer;
