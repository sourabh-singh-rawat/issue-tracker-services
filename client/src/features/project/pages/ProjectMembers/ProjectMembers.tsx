import React from "react";
import { useOutletContext } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import TabPanel from "../../../../common/components/TabPanel";
import MemberList from "../../components/MemberList";

export default function ProjectMembers() {
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      <MuiGrid spacing={1} container>
        <MuiGrid xs={12} item></MuiGrid>
        <MuiGrid xs={12} item>
          <MemberList />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
