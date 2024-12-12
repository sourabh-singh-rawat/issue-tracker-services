import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

dayjs.extend(relativeTime);

import { Grid2, useTheme } from "@mui/material";

import {
  FindStatusesQuery,
  useFindStatusesQuery,
} from "../../../../api/codegen/gql/graphql";
import { SpaceContext } from "../../../../common";
import { OutletContext } from "../../../../common/Interfaces";
import Tab from "../../../../common/components/Tab";
import Tabs from "../../../../common/components/Tabs";
import { AddItemButton } from "../../../issue/components/AddItemButton";

export function List() {
  const theme = useTheme();
  const { spaceId, listId, itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [statuses, setStatuses] = useState<FindStatusesQuery["findStatuses"]>(
    [],
  );
  useFindStatusesQuery({
    variables: { input: { listId: listId as string } },
    skip: !listId,
    onCompleted(response) {
      setStatuses(response.findStatuses);
    },
  });

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
    status: statuses,
  };

  useEffect(() => {
    setSelectedTab(mapPathToIndex[tabName]);
  }, [tabName, listId]);

  return (
    <SpaceContext.Provider value={{ statuses }}>
      <Grid2 container>
        {!itemId && (
          <Grid2
            size={12}
            sx={{
              pt: theme.spacing(1),
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Grid2 container>
              <Grid2>
                <Tabs value={selectedTab} onChange={handleChange}>
                  <Tab isLoading={false} label="Board" value={0} />
                  <Tab isLoading={false} label="List" value={1} />
                </Tabs>
              </Grid2>
              {listId && (
                <Grid2 sx={{ alignContent: "center" }}>
                  <AddItemButton listId={listId} />
                </Grid2>
              )}
            </Grid2>
          </Grid2>
        )}
        <Grid2 size={12}>
          <Outlet context={context} />
        </Grid2>
      </Grid2>
    </SpaceContext.Provider>
  );
}
