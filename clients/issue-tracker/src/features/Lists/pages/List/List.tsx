import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

dayjs.extend(relativeTime);

import { Grid2, useTheme } from "@mui/material";

import {
  FindStatusesQuery,
  useFindStatusesQuery,
  useFindViewsQuery,
} from "../../../../api/codegen/gql/graphql";
import { SpaceContext, useAppParams } from "../../../../common";
import { OutletContext } from "../../../../common/Interfaces";
import { CustomTab } from "../../../../common/components/CustomTab";
import { CustomTabs } from "../../../../common/components/CustomTabs";
import { AddItemButton } from "../../../issue/components/AddItemButton";

export function List() {
  const theme = useTheme();
  const location = useLocation();
  const { listId, itemId } = useAppParams();
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
  const { data: views } = useFindViewsQuery({
    variables: { listId },
    onCompleted(response) {
      console.log(response.findViews);
    },
    skip: !listId,
  });

  const tabName = location.pathname.split("/")[4] || "board";

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (e: unknown, newValue: number) => {
    // navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  const context: OutletContext = {
    listId,
    itemId,
    selectedTab: 1,
    status: statuses,
  };

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
                <CustomTabs value={selectedTab} handleChange={handleChange}>
                  {views?.findViews.map(({ id, name }, index) => {
                    return <CustomTab key={id} index={index} label={name} />;
                  })}
                </CustomTabs>
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
