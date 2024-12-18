import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Space } from "../../api";

interface SpaceSlice {
  spaces: Space[];
  isLoading: boolean;
}

const initialState: SpaceSlice = {
  spaces: [],
  isLoading: true,
};

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setSpaces: (state, action: PayloadAction<Space[]>) => {
      return {
        ...state,
        spaces: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { setSpaces } = spaceSlice.actions;
export default spaceSlice.reducer;
