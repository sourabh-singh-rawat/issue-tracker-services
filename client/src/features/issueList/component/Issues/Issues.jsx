import { useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiCircularProgress from "@mui/material/CircularProgress";
import MuiAddIcon from "@mui/icons-material/Add";

import SectionHeader from "../../../../common/SectionHeader";

export default function Issues() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const loading = useSelector((store) => store.auth.loading);

  return (
    <MuiGrid container gap="40px">
      {pathname === "/issues" && (
        <MuiGrid item xs={12}>
          <SectionHeader
            title="Issues"
            subtitle="This section contains all the issues that you have created."
            actionButton={
              <MuiButton
                variant="contained"
                startIcon={<MuiAddIcon />}
                onClick={() => navigate("/issues/new")}
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Create Issue
              </MuiButton>
            }
          />
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        {loading ? <MuiCircularProgress /> : <Outlet />}
      </MuiGrid>
    </MuiGrid>
  );
}
