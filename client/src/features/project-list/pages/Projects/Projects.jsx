import { Outlet, useLocation, useNavigate } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import SectionHeader from "../../../../common/headers/SectionHeader";
import PrimaryButton from "../../../../common/buttons/PrimaryButton";

const Projects = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MuiGrid container gap="40px">
      {pathname === "/projects" && (
        <MuiGrid item xs={12}>
          <SectionHeader
            title="Projects"
            subtitle="This section contains all the projects that you have created. You can
          go to individual project to edit."
            actionButton={
              <PrimaryButton
                label="Create Project"
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

export default Projects;
