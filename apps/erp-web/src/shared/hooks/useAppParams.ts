import { useParams } from "@tanstack/react-router";

export const useViewParams = () => {
  const { viewId, workspaceId } = useParams({ strict: false });

  if (!viewId || !workspaceId) {
    throw new Error("View ID and workspaceId is required");
  }

  return { viewId, workspaceId };
};
