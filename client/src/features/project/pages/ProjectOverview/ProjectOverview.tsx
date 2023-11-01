import React, { useEffect } from "react";

import MuiGrid from "@mui/material/Grid";

import Description from "../../../../common/components/Description";
import TabPanel from "../../../../common/components/TabPanel";
import { useUpdateProjectMutation } from "../../../../api/generated/project.api";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import { useMessageBar } from "../../../message-bar/hooks";
import AvatarGroup from "../../../../common/components/AvatarGroup";
import MuiTypography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

export default function ProjectOverview() {
  const theme = useTheme();
  const { showSuccess, showError } = useMessageBar();
  const { id, selectedTab, page, setPage, isLoading } = useSelectedTab();
  const [updateProject, { isSuccess, isError }] = useUpdateProjectMutation();

  const updateDescriptionQuery = async () => {
    updateProject({ id, body: { description: page.description } });
  };

  useEffect(() => {
    if (isSuccess) return showSuccess("Description updated successfully");

    if (isError) return showError("Error updating description");
  }, [isSuccess, isError]);

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <MuiGrid container>
        <MuiGrid md={8} item></MuiGrid>
        <MuiGrid md={4} item>
          <MuiGrid container rowSpacing={1} marginTop={2}>
            <MuiGrid xs={12} item>
              <Description
                page={page}
                setPage={setPage}
                updateQuery={updateDescriptionQuery}
                isLoading={isLoading}
              />
            </MuiGrid>
            <MuiGrid xs={12} item>
              <MuiTypography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                Members:
              </MuiTypography>
              <AvatarGroup
                members={page?.members}
                total={page?.members?.length}
              />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
