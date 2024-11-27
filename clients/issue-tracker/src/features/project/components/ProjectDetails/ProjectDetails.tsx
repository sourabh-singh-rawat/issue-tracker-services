import React from "react";
import MuiTable from "@mui/material/Table";
import MuiTableRow from "@mui/material/TableRow";
import MuiTableBody from "@mui/material/TableBody";
import MuiTypography from "@mui/material/Typography";
import MuiGrid from "@mui/material/Grid";

import AvatarGroup from "../../../../common/components/AvatarGroup";
import StyledCell from "../../../../common/components/styled/StyledCell";
import ProjectStatusSelector from "../../../project-list/components/ProjectStatusSelector";
import DateTag from "../../../../common/components/DateTag";

import { useTheme } from "@mui/material/styles";

interface Props {
  id: string;
  page: any;
}

export default function ProjectDetails({ id, page }: Props) {
  const theme = useTheme();
  const tableStyles = {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadiusMedium,
  };

  return (
    <MuiGrid container>
      <MuiGrid xs={12} sx={{ px: theme.spacing(1) }}>
        <MuiTypography variant="h6">Details</MuiTypography>
      </MuiGrid>
      <MuiGrid item xs={12} sx={tableStyles}>
        <MuiTable>
          <MuiTableBody>
            <MuiTableRow>
              <StyledCell>Status</StyledCell>
              <StyledCell>
                <ProjectStatusSelector
                  id={id}
                  value={page?.status}
                  options={[]}
                />
              </StyledCell>
            </MuiTableRow>
            <MuiTableRow>
              <StyledCell>Members</StyledCell>
              <StyledCell>
                <AvatarGroup members={[]} total={1} />
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
  );
}
