import React from "react";
import MuiGrid from "@mui/material/Grid";
import PageHeader from "../../../../common/components/PageHeader";

export default function WorkspaceSettings() {
  return (
    <MuiGrid container>
      <MuiGrid item xs={12}>
        <PageHeader title="Workspace Settings" showButton={false} />
      </MuiGrid>
    </MuiGrid>
  );
}
