import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MuiGrid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import MuiTypography from "@mui/material/Typography";
import ProjectList from "../../../project-list/components/ProjectList";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

export default function Projects() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const isNoProjectSelected = !id;

  return isNoProjectSelected ? (
    <MuiGrid container rowGap={2}>
      <MuiGrid item flexGrow={1}>
        <MuiTypography variant="h4" fontWeight="bold">
          Projects
        </MuiTypography>
      </MuiGrid>

      <MuiGrid item>
        <PrimaryButton
          label="New Project"
          type="button"
          startIcon={<AddIcon />}
          onClick={() => navigate("./new")}
        />
      </MuiGrid>

      <MuiGrid item xs={12}>
        <ProjectList />
      </MuiGrid>
    </MuiGrid>
  ) : (
    <Outlet />
  );
}
