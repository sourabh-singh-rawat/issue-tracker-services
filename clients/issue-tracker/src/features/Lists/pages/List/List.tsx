import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { Grid2, useTheme } from "@mui/material";

import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";
import { OutletContext } from "../../../../common/Interfaces";
import { useFindStatusesQuery } from "../../../../api/codegen/gql/graphql";
import { SpaceContext } from "../../../../common";

export function List() {
  const theme = useTheme();
  const { spaceId, listId, itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useFindStatusesQuery({
    variables: { input: { spaceId: spaceId as string } },
    skip: !spaceId,
  });

  console.log(location.pathname);
  const tabName = location.pathname.split("/")[4] || "board";
  const mapPathToIndex: Record<string, number> = { board: 0, items: 1 };
  const mapIndexToTab: Record<number, string> = {
    0: `board`,
    1: `items`,
  };

  const [selectedTab, setSelectedTab] = useState(mapPathToIndex[tabName]);

  const handleChange = (e: unknown, newValue: number) => {
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  const context: OutletContext = {
    spaceId,
    listId,
    itemId,
    selectedTab,
    status: data?.findStatuses || [],
  };

  useEffect(() => {
    setSelectedTab(mapPathToIndex[tabName]);
  }, [tabName, listId]);

  return (
    <SpaceContext.Provider value={{ statuses: data?.findStatuses || [] }}>
      <Grid2 container>
        {!itemId && (
          <Grid2 size={12} sx={{ pt: theme.spacing(1) }}>
            <Tabs value={selectedTab} onChange={handleChange}>
              <Tab isLoading={false} label="Board" value={0} />
              <Tab isLoading={false} label="List" value={1} />
            </Tabs>
          </Grid2>
        )}
        <Grid2 size={12}>
          <Outlet context={context} />
        </Grid2>
      </Grid2>
    </SpaceContext.Provider>
  );
}
