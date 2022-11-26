import { Outlet, useLocation, useNavigate } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";

import MuiAddIcon from "@mui/icons-material/Add";

import PrimaryButton from "../../../../common/PrimaryButton";
import SectionHeader from "../../../../common/SectionHeader";

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
