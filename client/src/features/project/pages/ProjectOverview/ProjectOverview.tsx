import React, { useEffect } from "react";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/components/TabPanel";
import Description from "../../../../common/components/Description";
import AvatarGroup from "../../../../common/components/AvatarGroup";
import { useMessageBar } from "../../../message-bar/hooks";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import { useUpdateProjectMutation } from "../../../../api/generated/project.api";

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
          <MuiGrid marginTop={2} container>
            <MuiGrid xs={12} item>
              <MuiTypography
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                Description:
              </MuiTypography>
              <Description
                page={page}
                setPage={setPage}
                updateQuery={updateDescriptionQuery}
                isLoading={isLoading}
              />
            </MuiGrid>
            <MuiGrid xs={12} item>
              <MuiGrid rowSpacing={1} container>
                <MuiGrid item xs={12}>
                  <MuiTypography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    Members:
                  </MuiTypography>
                </MuiGrid>
                <MuiGrid item>
                  <AvatarGroup
                    members={page?.members}
                    total={page?.members?.length}
                  />
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
