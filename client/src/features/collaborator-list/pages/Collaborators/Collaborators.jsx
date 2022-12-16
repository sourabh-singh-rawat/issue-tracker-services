import { useLocation, Outlet, useNavigate } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import SectionHeader from "../../../../common/headers/SectionHeader";
import PrimaryButton from "../../../../common/buttons/PrimaryButton";

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
            actionButton={<PrimaryButton label="Invite" onClick={() => ""} />}
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
