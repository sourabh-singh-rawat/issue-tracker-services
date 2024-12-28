import { useParams } from "react-router-dom";

export const useViewParams = () => {
  const { viewId, itemId } = useParams<{
    viewId: string;
    itemId: string;
  }>();

  return { viewId, itemId };
};
