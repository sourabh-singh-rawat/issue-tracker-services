import React from "react";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import TabPanel from "../../../../common/components/TabPanel";
import IssueList from "../../../issue-list/components/IssueList";
import AddIssueButton from "../../../issue/components/AddIssueButton";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";

export default function ProjectIssues() {
  const { selectedTab, id } = useSelectedTab();
  const theme = useTheme();

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      <MuiGrid container sx={{ py: theme.spacing(2) }}>
        <MuiGrid xs={12} item>
          <MuiGrid container>
            <MuiGrid item>{/* <IssuePriorityFilter /> */}</MuiGrid>
            <MuiGrid item>{/* <IssueStatusFilter /> */}</MuiGrid>
            <MuiGrid sx={{ flexGrow: 1 }} item />
            <MuiGrid item>
              <AddIssueButton projectId={id} />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <IssueList projectId={id} />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
