import React from "react";

import { useTheme } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import TabPanel from "../../../../common/components/TabPanel";
import IssueList from "../../../issue-list/components/ItemList";
import AddIssueButton from "../../../issue/components/AddIssueButton";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";

export function ListItems() {
  const theme = useTheme();
  const { selectedTab, id } = useSelectedTab();

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      <Grid2
        container
        sx={{ px: theme.spacing(2), py: theme.spacing(2) }}
        rowSpacing={2}
      >
        <Grid2 size={12}>
          <Grid2 container>
            <Grid2>{/* <IssuePriorityFilter /> */}</Grid2>
            <Grid2>{/* <IssueStatusFilter /> */}</Grid2>
            <Grid2 sx={{ flexGrow: 1 }} />
            <Grid2>
              <AddIssueButton projectId={id} />
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={12}>
          <IssueList listId={id} />
        </Grid2>
      </Grid2>
    </TabPanel>
  );
}
