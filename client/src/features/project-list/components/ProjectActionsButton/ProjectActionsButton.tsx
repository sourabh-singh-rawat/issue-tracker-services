/* eslint-disable react/prop-types */
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StyledMenu from "../../../../common/components/styled/StyledMenu";
import MenuItem from "../../../../common/components/MenuItem";
import TextButton from "../../../../common/components/buttons/TextButton";

interface ProjectActionsButtonProps {
  id: string;
}

export default function ProjectActionsButton({
  id,
}: ProjectActionsButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <TextButton onClick={handleClick} startIcon={<MoreHorizIcon />} />
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} label="Edit" />
        <MenuItem onClick={handleClose} label="Archive" />
      </StyledMenu>
    </>
  );
}
