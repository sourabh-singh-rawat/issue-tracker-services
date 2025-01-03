import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List, Space } from "../../api";

interface SpaceSlice {
  spaces: Space[];
  currentList: List | null;
  isLoading: boolean;
}

const initialState: SpaceSlice = {
  spaces: [],
  currentList: null,
  isLoading: true,
};

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setCurrentList: (state, action: PayloadAction<List>) => {
      return {
        ...state,
        currentList: action.payload,
      };
    },
    setSpaces: (state, action: PayloadAction<Space[]>) => {
      return {
        ...state,
        spaces: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { setCurrentList, setSpaces } = spaceSlice.actions;
export default spaceSlice.reducer;
