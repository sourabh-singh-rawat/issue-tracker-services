import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/stores/redux.store";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
