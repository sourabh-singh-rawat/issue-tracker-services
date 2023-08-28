import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../../app/store.config";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
