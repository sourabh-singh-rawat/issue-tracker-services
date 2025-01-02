import { useParams } from "react-router-dom";

export const useViewParams = () => {
  const { viewId, workspaceId } = useParams<{
    viewId: string;
    workspaceId: string;
  }>();

  if (!viewId || !workspaceId) {
    throw new Error("View ID and workspaceId is required");
  }

  return { viewId, workspaceId };
};
