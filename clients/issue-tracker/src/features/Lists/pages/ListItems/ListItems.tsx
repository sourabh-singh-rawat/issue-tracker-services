import React from "react";

import { Grid2, useTheme } from "@mui/material";
import TabPanel from "../../../../common/components/TabPanel";
import IssueList from "../../../issue-list/components/ItemList";
import AddIssueButton from "../../../issue/components/AddIssueButton";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import { Outlet } from "react-router-dom";

export function ListItems() {
  const theme = useTheme();
  const { listId, workspaceId, itemId, selectedTab } = useSelectedTab();

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      {!itemId ? (
        <Grid2
          container
          rowSpacing={2}
          sx={{ px: theme.spacing(4), py: theme.spacing(2) }}
        >
          <Grid2 size={12}>
            <Grid2 container>
              <Grid2>{/* <IssuePriorityFilter /> */}</Grid2>
              <Grid2>{/* <IssueStatusFilter /> */}</Grid2>
              <Grid2 sx={{ flexGrow: 1 }} />
              <Grid2>
                <AddIssueButton projectId={listId} />
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={12}>
            <IssueList listId={listId} />
          </Grid2>
        </Grid2>
      ) : (
        <Outlet />
      )}
    </TabPanel>
  );
}
