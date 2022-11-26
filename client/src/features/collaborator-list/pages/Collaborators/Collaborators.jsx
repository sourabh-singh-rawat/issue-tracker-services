import { useLocation, Outlet, useNavigate } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiAddIcon from "@mui/icons-material/Add";

import SectionHeader from "../../../../common/SectionHeader";
import PrimaryButton from "../../../../common/PrimaryButton";

const Collaborators = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MuiGrid container gap="40px">
      {pathname === "/collaborators" && (
        <MuiGrid item xs={12}>
          <SectionHeader
            title="Colaborators"
            subtitle="This section contains all the collaborators that work with you."
            actionButton={
              <PrimaryButton
                label="Invite"
                onClick={() => navigate("/projects/new")}
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

export default Collaborators;
