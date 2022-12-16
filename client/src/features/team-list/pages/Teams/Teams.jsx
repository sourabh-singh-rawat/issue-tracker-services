import { useLocation, useNavigate, Outlet } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import SectionHeader from "../../../../common/headers/SectionHeader";
import PrimaryButton from "../../../../common/buttons/PrimaryButton";

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
              <PrimaryButton
                label="Create Team"
                onClick={() => navigate("/teams/new")}
              />
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
