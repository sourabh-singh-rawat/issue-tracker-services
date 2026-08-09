import { useParams } from "@tanstack/react-router";

export const useViewParams = () => {
  const { viewId } = useParams({ strict: false });

  if (!viewId) {
    throw new Error("View ID is required");
  }

  return { viewId };
};
