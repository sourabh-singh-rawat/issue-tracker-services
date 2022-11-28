import { useNavigate, useLocation, Outlet } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import SectionHeader from "../../../../common/SectionHeader";
import PrimaryButton from "../../../../common/PrimaryButton";

const Issues = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MuiGrid container gap="40px">
      {pathname === "/issues" && (
        <MuiGrid item xs={12}>
          <SectionHeader
            title="Issues"
            subtitle="All the issues assgined to you or created by you."
            actionButton={
              <PrimaryButton
                label="Create Issue"
                onClick={() => navigate("/issues/new")}
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

export default Issues;
