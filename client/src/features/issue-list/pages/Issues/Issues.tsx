/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

export default function Issues() {
  const navigate = useNavigate();
  const location = useLocation();

  const isIssuesPage = !location.pathname.split("/")[2];

  return (
    <MuiGrid container rowGap={1}>
      {isIssuesPage && (
        <>
          <MuiGrid item flexGrow={1}>
            <MuiTypography variant="h4" fontWeight="bold">
              Issue
            </MuiTypography>
            <MuiTypography variant="body2">
              This section contains all the projects that you have created. You
              can go to individual project to edit them.
            </MuiTypography>
          </MuiGrid>

          <MuiGrid item>
            <PrimaryButton
              label="Create Issue"
              type="button"
              startIcon={<AddIcon />}
              onClick={() => navigate("./new")}
            />
          </MuiGrid>
        </>
      )}

      <MuiGrid item xs={12}>
        <Outlet />
      </MuiGrid>
    </MuiGrid>
  );
}
