import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiAddIcon from "@mui/icons-material/Add";
import SectionHeader from "../../../../common/SectionHeader/SectionHeader";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

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
              <MuiButton
                variant="contained"
                startIcon={<MuiAddIcon />}
                onClick={() => navigate("/projects/new")}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Create Project
              </MuiButton>
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
