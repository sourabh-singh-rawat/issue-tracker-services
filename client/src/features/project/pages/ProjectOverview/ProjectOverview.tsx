import React, { useEffect } from "react";
import dayjs from "dayjs";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiTable from "@mui/material/Table";
import MuiTableRow from "@mui/material/TableRow";
import MuiTableBody from "@mui/material/TableBody";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/components/TabPanel";
import Description from "../../../../common/components/Description";
import AvatarGroup from "../../../../common/components/AvatarGroup";
import StyledCell from "../../../../common/components/styled/StyledCell";

import { useMessageBar } from "../../../message-bar/hooks";
import { useSelectedTab } from "../../../../common/hooks/useSelectedTab";
import {
  useGetProjectMembersQuery,
  useGetProjectStatusListQuery,
  useUpdateProjectMutation,
} from "../../../../api/generated/project.api";
import ProjectStatusSelector from "../../../project-list/components/ProjectStatusSelector";
import DateTag from "../../../../common/components/DateTag";

export default function ProjectOverview() {
  const theme = useTheme();
  const { showSuccess, showError } = useMessageBar();
  const { id, selectedTab, page, setPage, isLoading } = useSelectedTab();
  const [updateProject, { isSuccess, isError }] = useUpdateProjectMutation();
  const { data: statuses } = useGetProjectStatusListQuery();
  const { data: members } = useGetProjectMembersQuery({ id });

  const updateDescriptionQuery = async () => {
    updateProject({ id, body: { description: page.description } });
  };

  useEffect(() => {
    if (isSuccess) return showSuccess("Description updated successfully");
    if (isError) return showError("Error updating description");
  }, [isSuccess, isError]);

  return (
    <TabPanel index={0} selectedTab={selectedTab}>
      <MuiGrid container spacing={2} sx={{ py: theme.spacing(2) }}>
        <MuiGrid md={8} item>
          <MuiGrid container>
            <MuiGrid item xs={12}>
              <Description
                page={page}
                setPage={setPage}
                updateQuery={updateDescriptionQuery}
                isLoading={isLoading}
              />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid md={4} item>
          <MuiTypography variant="body1">
            <b>Details</b>
          </MuiTypography>
          <MuiTable>
            <MuiTableBody>
              <MuiTableRow>
                <StyledCell>Status</StyledCell>
                <StyledCell>
                  <ProjectStatusSelector
                    id={id}
                    value={page?.status}
                    options={statuses?.rows}
                  />
                </StyledCell>
              </MuiTableRow>
              <MuiTableRow>
                <StyledCell>Members</StyledCell>
                <StyledCell>
                  <AvatarGroup
                    members={members?.rows}
                    total={members?.rows?.length}
                  />
                </StyledCell>
              </MuiTableRow>
              <MuiTableRow>
                <StyledCell>Due Date</StyledCell>
                <StyledCell>
                  <DateTag date={page?.dueDate} />
                </StyledCell>
              </MuiTableRow>
              <MuiTableRow>
                <StyledCell>Created By</StyledCell>
                <StyledCell>
                  <DateTag date={page?.createdAt} />
                </StyledCell>
              </MuiTableRow>
              <MuiTableRow>
                <StyledCell>Last Updated</StyledCell>
                <StyledCell>
                  <DateTag date={page?.updatedAt} />
                </StyledCell>
              </MuiTableRow>
            </MuiTableBody>
          </MuiTable>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
}
