import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store.config";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
