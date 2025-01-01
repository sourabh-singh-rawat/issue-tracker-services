import { useParams } from "react-router-dom";

export const useViewParams = () => {
  const { viewId } = useParams<{ viewId: string }>();

  if (!viewId) {
    throw new Error("View ID is required");
  }

  return { viewId };
};
