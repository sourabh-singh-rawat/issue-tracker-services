import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Menu, MenuItem, styled, Typography } from "@mui/material";
import MuiBox from "@mui/material/Box";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

import DeleteProjectButton from "../DeleteProjectButton";

const StyledButton = styled(Button)(({ theme }) => {
  return {
    "&.MuiButton-root": {
      padding: 0,
      margin: 0,
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
      <StyledButton onClick={handleClick} disableRipple>
        <MoreHoriz sx={{ color: "text.primary" }} />
      </StyledButton>
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
