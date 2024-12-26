import { useParams } from "react-router-dom";

export const useAppParams = () => {
  const { viewId, itemId, listId } = useParams<{
    viewId: string;
    listId: string;
    itemId: string;
  }>();

  return { viewId, itemId, listId };
};
