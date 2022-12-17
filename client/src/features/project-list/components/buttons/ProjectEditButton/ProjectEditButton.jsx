import { useNavigate } from "react-router-dom";

import { theme } from "../../../../../config/mui.config";

import MuiIconButton from "@mui/material/IconButton";

import MuiEditIcon from "@mui/icons-material/Edit";

const ProjectEditButton = ({ id }) => {
  const navigate = useNavigate();

  return (
    <MuiIconButton
      size="small"
      onClick={() => navigate(`/projects/${id}/settings`)}
      sx={{
        color: theme.palette.grey[300],
        transition: "ease-in-out 0.2s",
        "&:hover": { color: theme.palette.primary.main },
      }}
      disableRipple
    >
      <MuiEditIcon />
    </MuiIconButton>
  );
};

export default ProjectEditButton;
