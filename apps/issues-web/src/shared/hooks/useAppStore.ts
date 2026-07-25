import { useNavigate } from "@tanstack/react-router";
import { useProjectStore } from "../../features/project/store";

export const useAppStore = () => {
  const navigate = useNavigate();
  const currentProject = useProjectStore((s) => s.currentProject);

  if (!currentProject) {
    navigate({ to: "/" });
  }

  return { currentProject };
};
