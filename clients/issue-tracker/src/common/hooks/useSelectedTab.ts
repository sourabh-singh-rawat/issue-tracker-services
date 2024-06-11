import { useOutletContext } from "react-router-dom";

export const useSelectedTab = () => {
  const { id, selectedTab, page, setPage, isLoading } = useOutletContext<{
    id: string;
    selectedTab: number;
    page: unknown;
    setPage: unknown;
    isLoading: boolean;
  }>();

  if (!id) {
    throw new Error("No id found, check the Tabs/Tab section");
  }

  return { id, selectedTab, page, setPage, isLoading };
};
