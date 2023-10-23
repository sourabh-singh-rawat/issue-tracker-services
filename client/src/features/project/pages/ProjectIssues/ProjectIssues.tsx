import React from "react";
import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import TabPanel from "../../../../common/components/TabPanel";
import IssueList from "../../../issue-list/components/IssueList";
import AddIssueButton from "../../../issue/components/AddIssueButton";

export default function ProjectIssues() {
  const { id } = useParams();
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      <MuiGrid spacing={1} paddingTop={2} container>
        <MuiGrid xs={12} item>
          <MuiGrid columnSpacing={1} container>
            <MuiGrid item>{/* <IssuePriorityFilter /> */}</MuiGrid>
            <MuiGrid item>{/* <IssueStatusFilter /> */}</MuiGrid>
            <MuiGrid sx={{ flexGrow: 1 }} item />
            <MuiGrid item>
              <AddIssueButton projectId={id} />
            </MuiGrid>
            <MuiGrid item />
          </MuiGrid>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <IssueList projectId={id} />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
