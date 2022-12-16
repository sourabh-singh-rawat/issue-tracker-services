import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Menu, MenuItem, styled, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

import DeleteProjectButton from "../DeleteProjectButton";

const StyledIconButton = styled(MuiIconButton)(({ theme }) => {
  return {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  };
});

const ActionButtons = ({ id }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <StyledIconButton onClick={handleClick} disableRipple>
        <MoreHoriz sx={{ color: "text.primary" }} />
      </StyledIconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          key="edit"
          onClick={() => {
            handleClose();
            navigate(`/projects/${id}/settings`);
          }}
          disableRipple
        >
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <DeleteProjectButton id={id} />
      </Menu>
    </Fragment>
  );
};

export default ActionButtons;
