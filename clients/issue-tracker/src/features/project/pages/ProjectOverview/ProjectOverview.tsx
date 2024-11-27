import React, { useEffect, useState } from "react";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";

import TabPanel from "../../../../common/components/TabPanel";

import { useMessageBar } from "../../../message-bar/hooks";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import ProjectDetails from "../../components/ProjectDetails";
import Description2 from "../../../../common/components/ItemDescription";

export default function ProjectOverview() {
  const theme = useTheme();
  const { showSuccess, showError } = useMessageBar();
  const { id, selectedTab, page, isLoading } = useSelectedTab();
  const [updateProject, { isSuccess, isError }] = useState();

  useEffect(() => {
    if (isSuccess) return showSuccess("Description updated successfully");
    if (isError) return showError("Error updating description");
  }, [isSuccess, isError]);

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <MuiGrid container spacing={2} sx={{ py: theme.spacing(2) }}>
        <MuiGrid xs={12} md={8} item>
          <MuiGrid container>
            <MuiGrid item xs={12}>
              <Description2
                defaultValue={page?.description}
                handleSubmit={async (value) => {
                  await updateProject({ id, body: { description: value } });
                }}
                isLoading={isLoading}
              />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid xs={12} md={4} item>
          <ProjectDetails id={id} page={page} />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
