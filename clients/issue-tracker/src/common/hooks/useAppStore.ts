import { useNavigate } from "@tanstack/react-router";
import { useSpaceStore } from "../../features/space/store";

export const useAppStore = () => {
  const navigate = useNavigate();
  const currentList = useSpaceStore((s) => s.currentList);

  if (!currentList) {
    navigate({ to: "/" });
  }

  return { currentList };
};
