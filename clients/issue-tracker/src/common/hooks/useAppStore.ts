import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./useAppSelector";

export const useAppStore = () => {
  const navigate = useNavigate();
  const currentList = useAppSelector((x) => x.space.currentList);

  if (!currentList) {
    navigate("/");
  }

  return { currentList };
};
