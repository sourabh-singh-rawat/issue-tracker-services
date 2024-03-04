import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import IssueList from "../../components/IssueList";

export default function Issues() {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const isNoIssueSelected = !id;

  return isNoIssueSelected ? (
    <MuiGrid container rowGap={2}>
      <MuiGrid item flexGrow={1}>
        <MuiTypography variant="h4" fontWeight="bold">
          Issues
        </MuiTypography>
      </MuiGrid>
      <MuiGrid item xs={12}>
        <IssueList />
      </MuiGrid>
    </MuiGrid>
  ) : (
    <Outlet />
  );
}
