import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../../core/stores/redux.store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
