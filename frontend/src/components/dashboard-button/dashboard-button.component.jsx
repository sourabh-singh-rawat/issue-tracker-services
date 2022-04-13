import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";

const DashboardButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div style={{ marginLeft: "auto" }}>
      <Button onClick={handleClick}>Create</Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Project</MenuItem>
        <MenuItem onClick={handleClose}>Team</MenuItem>
        <MenuItem onClick={handleClose}> Issue</MenuItem>
      </Menu>
    </div>
  );
};
export default DashboardButton;
