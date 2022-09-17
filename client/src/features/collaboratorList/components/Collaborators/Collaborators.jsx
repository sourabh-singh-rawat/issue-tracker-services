import { useLocation, Outlet } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import SectionHeader from "../../../../common/SectionHeader";

const People = () => {
  const { pathname } = useLocation();

  return (
    <MuiGrid container gap="40px">
      {pathname === "/collaborators" && (
        <MuiGrid item xs={12}>
          <SectionHeader
            title="People"
            subtitle="This section contains all the collaborators that work with you."
          />
        </MuiGrid>
      )}
      <MuiGrid item xs={12}>
        <Outlet />
      </MuiGrid>
    </MuiGrid>
  );
};

export default People;
