import React from "react";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import ProjectForm from "../../components/ProjectForm";

export default function ProjectPage() {
  return (
    <MuiContainer disableGutters>
      <MuiGrid container>
        <MuiGrid item xs={12}>
          <ProjectForm />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}
