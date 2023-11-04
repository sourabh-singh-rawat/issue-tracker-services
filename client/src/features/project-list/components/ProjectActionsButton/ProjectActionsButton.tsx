/* eslint-disable react/prop-types */
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StyledMenu from "../../../../common/components/styled/StyledMenu";
import MenuItem from "../../../../common/components/MenuItem";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton/StyledIconButton";

interface ProjectActionsButtonProps {
  options: [];
}

export default function ProjectActionsButton({
  options = [],
}: ProjectActionsButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <StyledIconButton onClick={handleClick} disableRipple>
        <MoreHorizIcon />
      </StyledIconButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option[2]} onClick={handleClose} label={option[2]} />
        ))}
      </StyledMenu>
    </>
  );
}
