import { useParams } from "react-router-dom";

export const useItemParams = () => {
  const { itemId } = useParams<{ itemId: string }>();

  if (!itemId) throw new Error("Item ID is required");

  return { itemId };
};
