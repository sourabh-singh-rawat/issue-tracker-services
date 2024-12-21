import { useParams } from "react-router-dom";

export const useAppParams = () => {
  const { itemId, listId } = useParams<{ listId: string; itemId: string }>();

  return { itemId, listId };
};
