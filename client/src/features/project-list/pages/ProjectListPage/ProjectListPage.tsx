import React from "react";
import { useNavigate } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

import ProjectList from "../../components/ProjectList";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

export default function ProjectListPage() {
  const navigate = useNavigate();

  return (
    <MuiGrid container rowGap={1}>
      <MuiGrid item flexGrow={1}>
        <MuiTypography variant="h4" fontWeight="bold">
          Project
        </MuiTypography>
        <MuiTypography variant="body2">
          This section contains all the projects that you have created or are
          member of. You can go to individual project to edit them.
        </MuiTypography>
      </MuiGrid>

      <MuiGrid item>
        <PrimaryButton
          label="Create Project"
          type="button"
          startIcon={<AddIcon />}
          onClick={() => navigate("./new")}
        />
      </MuiGrid>

      <MuiGrid item xs={12}>
        <ProjectList />
      </MuiGrid>
    </MuiGrid>
  );
}
