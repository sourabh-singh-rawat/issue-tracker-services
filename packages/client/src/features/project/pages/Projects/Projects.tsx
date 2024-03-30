import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MuiGrid from "@mui/material/Grid";
import ProjectList from "../../../project-list/components/ProjectList";
import PageHeader from "../../../../common/components/PageHeader";

export default function Projects() {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const isNoProjectSelected = !id;

  return isNoProjectSelected ? (
    <MuiGrid container rowGap={2}>
      <MuiGrid item xs={12}>
        <PageHeader title="Projects" />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <ProjectList />
      </MuiGrid>
    </MuiGrid>
  ) : (
    <Outlet />
  );
}
