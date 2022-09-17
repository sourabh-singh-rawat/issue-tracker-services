import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { Button, Toolbar, Typography } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import Add from "@mui/icons-material/Add";

import SectionHeader from "../../../../common/SectionHeader/SectionHeader";

const Teams = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <MuiGrid container gap="40px">
      {pathname === "/teams" && (
        <MuiGrid item xs={12}>
          <SectionHeader
            title="Teams"
            subtitle="Create teams to organize people involved with your project."
            actionButton={
              <Button
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "bold" }}
                startIcon={<Add />}
                onClick={() => navigate("/teams/new")}
              >
                Create Team
              </Button>
            }
          />
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        <Outlet />
      </MuiGrid>
    </MuiGrid>
  );
};

export default Teams;
