import { useState } from "react";

import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DashboardButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div style={{ marginLeft: "auto" }}>
      <Button onClick={handleClick} endIcon={<ExpandMoreIcon />}>
        Create
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Project</MenuItem>
        <MenuItem onClick={handleClose}>Team</MenuItem>
        <MenuItem onClick={handleClose}> Issue</MenuItem>
      </Menu>
    </div>
  );
};
export default DashboardButton;
