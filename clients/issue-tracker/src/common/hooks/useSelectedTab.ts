import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../Interfaces";

export const useSelectedTab = () => {
  const { spaceId, itemId, listId, selectedTab, status } =
    useOutletContext<OutletContext>();

  return { spaceId, itemId, listId, selectedTab, status };
};
