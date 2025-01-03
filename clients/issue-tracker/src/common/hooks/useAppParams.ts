import { useParams } from "react-router-dom";

export const useViewParams = () => {
  const { viewId, workspaceId, itemId } = useParams<{
    viewId: string;
    workspaceId: string;
    itemId: string;
  }>();

  if (!viewId || !workspaceId) {
    throw new Error("View ID and workspaceId is required");
  }

  return { viewId, workspaceId, itemId };
};
